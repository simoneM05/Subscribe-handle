import { prisma } from "../config/prisma";
import { ApiError } from "../error/apiError";

export async function SubUser(
  name: string,
  price: number,
  renewal: string,
  type: string,
  userId: string
) {
  return await prisma.sub.create({
    data: { name, price, renewal, type, userId },
  });
}

export async function getUsers(skip: number, take: number) {
  const users = await prisma.user.findMany({ skip, take });
  return users;
}

export async function getSub(data: Partial<{ name: string; id: string }>) {
  const user = data.name
    ? await prisma.user.findUnique({ where: { email: data.name } })
    : data.id
    ? await prisma.user.findUnique({ where: { id: data.id } })
    : null;
  return user;
}

export async function updateSub(
  id: string,
  update: Partial<{
    name: string;
    price: number;
    renewal: string;
    type: string;
  }>
) {
  const filtredUpdate = Object.fromEntries(
    Object.entries(update).filter(([_, v]) => v !== undefined)
  );

  if (Object.keys(filtredUpdate).length === 0) {
    throw new ApiError("Nessum campo valido da aggiornare", 400);
  }
  return await prisma.user.update({
    where: { id },
    data: filtredUpdate,
  });
}
