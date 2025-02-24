import { prisma } from "../config/prisma";
import { ApiError } from "../error/apiError";
import { SubI } from "../interface/SubI";

export async function getSubOne(
  userId: string,
  data: Partial<{ name: string; id: string }>
) {
  const sub = data.name
    ? await prisma.sub.findFirst({ where: { name: data.name, userId } })
    : data.id
    ? await prisma.sub.findUnique({ where: { id: data.id, userId } })
    : null;
  return sub;
}

export async function createSub(
  name: string,
  price: number,
  renewal: string,
  type: string,
  userId: string
) {
  const existringSub = getSubOne(userId, { name });
  if (!existringSub) {
    //search user for email because is uniqe
    return await prisma.sub.create({
      data: { name, price, renewal, type, userId },
    });
  } else {
    return new ApiError("sub alredy exists", 403); //in case user is found return ApiError type
  }
}

export async function getSubsPagination(
  skip: number,
  take: number,
  userId: string
) {
  const subs = await prisma.sub.findMany({
    where: { userId },
    skip, //how many skip subs
    take, //how many subs take
    orderBy: { createAt: "asc" },
  });
  console.log("Filtering subs for userId:", userId);
  const total = await prisma.sub.count({ where: { userId } }); // count total subs

  return { subs, total };
}

export async function updateSub(
  id: string,
  userId: string,
  update: Partial<SubI>
) {
  const filtredUpdate = Object.fromEntries(
    Object.entries(update).filter(([_, v]) => v !== undefined)
  );

  if (Object.keys(filtredUpdate).length === 0) {
    return new ApiError("Nessum campo valido da aggiornare", 400);
  }
  const editSub = getSubOne(userId, { id });
  if (!editSub) {
    return new ApiError("sub not found", 404);
  }
  const updateSub = await prisma.sub.update({
    where: { id },
    data: filtredUpdate,
  });
  return updateSub;
}

export async function deleteSubOne(id: string, userId: string) {
  const editSub = getSubOne(userId, { id });
  if (!editSub) {
    return new ApiError("sub not found", 404);
  }
  return await prisma.sub.delete({
    where: { id },
  });
}
