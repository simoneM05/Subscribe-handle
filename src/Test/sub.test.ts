import request from "supertest";
import { app } from "..";
import { prisma } from "../config/prisma";
import redisClient from "../config/redis";

describe("Subscriptions API", () => {
  const subPath = "/api/subs/";
  let token: string;
  let idSub: string;
  beforeAll(async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password",
    });
    await prisma.$executeRaw`BEGIN;`;

    token = res.body.token;
  });

  afterAll(async () => {
    await prisma.$executeRaw`ROLLBACK;`;
    await prisma.$disconnect();
    await redisClient.quit(); // close redis
  });

  test(`POST ${subPath}addSub`, async () => {
    const newSub = {
      name: "Pro Plan",
      price: 9.99,
      renewal: new Date("2025-03-01"),
      type: "monthly",
      active: true,
    };

    const res = await request(app)
      .post("/api/subs/addSub")
      .set("Authorization", `Bearer ${token}`)
      .send(newSub);
    expect(res.status).toBe(201);
    expect(res.body.sub.name).toBe(newSub.name);
    idSub = res.body.sub.id;
  });

  test(`GET ${subPath}getSub/:id`, async () => {
    const res = await request(app)
      .get(`${subPath}getSub/${idSub}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.sub.id).toBe(idSub);
  });

  test(`GET ${subPath}getSub/?page=n`, async () => {
    const res = await request(app)
      .get(`${subPath}getSubs/?page=1`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("subs");
  });

  test(` ${subPath}editSub/:id`, async () => {
    const editSub = {
      name: "Pro Plan 2",
      active: false,
    };
    const res = await request(app)
      .put(`${subPath}editSub/${idSub}`)
      .set("Authorization", `Bearer ${token}`)
      .send(editSub);

    expect(res.status).toBe(201);

    expect(res.body.name).toBe("Pro Plan 2");
    expect(res.body.active).toBe(false);
  });

  test(` ${subPath}deleteSub/:id`, async () => {
    const res = await request(app)
      .delete(`${subPath}deleteSub/${idSub}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);

    expect(res.body.id).toBe(idSub);
  });
});
