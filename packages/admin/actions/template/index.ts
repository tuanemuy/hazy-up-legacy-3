"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ReturnType, prisma } from "db";
import { getSchema, addOrEditSchema, removeSchema } from "./schema";

export type GetResult = ReturnType<typeof getAction>;

export async function getAction(input: z.infer<typeof getSchema>) {
  const templates = await prisma.template
    .findMany({
      skip: input.perPage * (input.page - 1),
      take: input.perPage,
      orderBy: {
        id: input.orderBy === "id" ? input.order : undefined,
        name: input.orderBy === "name" ? input.order : undefined,
      },
      where: {
        id: input.id
          ? {
              contains: input.id,
            }
          : undefined,
        name: input.name
          ? {
              contains: input.name,
            }
          : undefined,
      },
      include: {
        thumbnail: {
          include: {
            assets: true,
          },
        },
      },
    })
    .catch((_e) => []);

  const count = await prisma.template
    .count({
      where: {
        id: input.id
          ? {
              contains: input.id,
            }
          : undefined,
        name: input.name
          ? {
              contains: input.name,
            }
          : undefined,
      },
    })
    .catch((_e) => 0);

  return { templates, count };
}

export async function addOrEditAction(input: z.infer<typeof addOrEditSchema>) {
  if (input.id) {
    return prisma.template.update({
      where: {
        id: input.id,
      },
      include: {
        thumbnail: {
          include: {
            assets: true,
          },
        },
      },
      data: {
        name: input.name,
        structure: input.structure,
        thumbnail: input.thumbnailId
          ? {
              connect: {
                id: input.thumbnailId,
              },
            }
          : undefined,
      },
    });
  } else {
    return prisma.template.create({
      include: {
        thumbnail: {
          include: {
            assets: true,
          },
        },
      },
      data: {
        name: input.name,
        structure: input.structure,
        thumbnail: input.thumbnailId
          ? {
              connect: {
                id: input.thumbnailId,
              },
            }
          : undefined,
      },
    });
  }
}

export async function removeAction(input: z.infer<typeof removeSchema>) {
  const deleted = await prisma.template.delete({
    where: {
      id: input.id,
    },
  });
  revalidatePath("/template");
  return deleted;
}
