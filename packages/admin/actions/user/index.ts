"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ReturnType, prisma } from "db";
import { getSchema, addOrEditSchema, removeSchema } from "./schema";

export type GetResult = ReturnType<typeof getAction>;

export async function getAction(input: z.infer<typeof getSchema>) {
  const users = await prisma.user
    .findMany({
      skip: input.perPage * (input.page - 1),
      take: input.perPage,
      orderBy: {
        createdAt: input.orderBy === "createdAt" ? input.order : undefined,
        id: input.orderBy === "id" ? input.order : undefined,
      },
      where: {
        id: input.id
          ? {
              contains: input.id,
            }
          : undefined,
        email: input.email
          ? {
              contains: input.email,
            }
          : undefined,
        role: input.role || undefined,
      },
    })
    .catch((_e) => []);

  const count = await prisma.user
    .count({
      where: {
        id: input.id
          ? {
              contains: input.id,
            }
          : undefined,
        email: input.email
          ? {
              contains: input.email,
            }
          : undefined,
        role: input.role || undefined,
      },
    })
    .catch((_e) => 0);

  return { users, count };
}

export async function addOrEditAction(input: z.infer<typeof addOrEditSchema>) {
  if (input.id) {
    return prisma.user.update({
      where: {
        id: input.id,
      },
      data: input,
    });
  } else {
    return prisma.user.create({
      data: input,
    });
  }
}

export async function removeAction(input: z.infer<typeof removeSchema>) {
  const deleted = await prisma.user.delete({
    where: {
      id: input.id,
    },
  });
  revalidatePath("/user");
  return deleted;
}
