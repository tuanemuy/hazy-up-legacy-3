import { z } from "zod";
import { prisma } from "db";
import { getTemplateSchema } from "./schema";
import { ActionError } from "../error";

export async function getTemplate({ id }: z.infer<typeof getTemplateSchema>) {
  try {
    const template = await prisma.template.findUnique({
      where: {
        id,
      },
      include: {
        thumbnail: {
          include: {
            assets: true,
          },
        },
      },
    });
    return { template, error: template ? null : ActionError.NotFoundError };
  } catch (e) {
    console.error(e);
    return { template: null, error: ActionError.DatabaseError };
  }
}
