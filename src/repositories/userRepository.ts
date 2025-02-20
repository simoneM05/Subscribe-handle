import { prisma } from "../config/prisma";
import { ApiError } from "../error/apiError";

export async function createUser(email: string, password: string) {
  if (!(await prisma.user.findUnique({ where: { email: email } }))) {
    //search user for email because is uniqe
    return await prisma.user.create({
      data: { email, password },
    });
  } else {
    return new ApiError("user alredy exists", 403); //in case user is found return ApiError type
  }
}

export async function getUsers(skip: number, take: number) {} //use pagination prisma.user.findMany({ skip, take });
export async function getUser(data: Partial<{ email: string; id: string }>) {
  const user = data.email
    ? await prisma.user.findUnique({ where: { email: data.email } })
    : data.id
    ? await prisma.user.findUnique({ where: { id: data.id } })
    : null;
  return user;
}

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
