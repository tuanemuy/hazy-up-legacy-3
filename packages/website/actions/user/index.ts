"use server";

import { z } from "zod";
import { prisma } from "db";
import { getUserSchema } from "./schema";
import { ActionError } from "../error";

export async function getUser({ id }: z.infer<typeof getUserSchema>) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return { user, error: ActionError.NotFoundError };
    }

    return { user, error: null };
  } catch (e) {
    console.error(e);
    return {
      user: null,
      error: ActionError.DatabaseError,
    };
  }
}
