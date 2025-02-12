import { prisma } from "../config/prisma";

export async function createUser(email: string, password: string) {
  if (!(await prisma.user.findUnique({ where: { email: email } }))) {
    return await prisma.user.create({
      data: { email, password },
    });
  } else {
    return new Error("user alredy exists");
  }
}

export async function getUsers(skip: number, take: number) {} //use pagination prisma.user.findMany({ skip, take });
export async function getUser(id: string) {}

export async function updateUser(
  id: string,
  update: Partial<{ email: string; password: string }>
) {
  const filtredUpdate = Object.fromEntries(
    Object.entries(update).filter(([_, v]) => v !== undefined)
  );

  if (Object.keys(filtredUpdate).length === 0) {
    throw new Error("Nessum campo valido da aggiornare");
  }
  return await prisma.user.update({
    where: { id },
    data: filtredUpdate,
  });
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id },
  });
}
