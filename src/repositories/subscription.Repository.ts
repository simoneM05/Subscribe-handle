import { prisma } from "../config/prisma";
import { ApiError } from "../error/apiError";

export async function createSub(
  name: string,
  price: number,
  renewal: string,
  type: string,
  userId: string
) {
  if (!(await prisma.sub.findUnique({ where: { name: name } }))) {
    //search user for email because is uniqe
    return await prisma.sub.create({
      data: { name, price, renewal, type, userId },
    });
  } else {
    return new ApiError("sub alredy exists", 403); //in case user is found return ApiError type
  }
}

export async function getSubs(skip: number, take: number) {
  const sub = await prisma.sub.findMany({ skip, take });
  return sub;
}

export async function getSub(data: Partial<{ name: string; id: string }>) {
  const sub = data.name
    ? await prisma.sub.findUnique({ where: { name: data.name } })
    : data.id
    ? await prisma.sub.findUnique({ where: { id: data.id } })
    : null;
  return sub;
}

export async function updateSub(
  id: string,
  UserId: string,
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
  return await prisma.sub.update({
    where: { id: id, userId: UserId },
    data: filtredUpdate,
  });
}
