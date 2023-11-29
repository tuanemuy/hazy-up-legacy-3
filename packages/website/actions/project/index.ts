"use server";

import { z } from "zod";
import { prisma } from "db";
import {
  addProjectSchema,
  editProjectSchema,
  deleteProjectSchema,
} from "./schema";
import { ActionError } from "../error";

export async function addProject({
  id,
  userId,
}: z.infer<typeof addProjectSchema>) {
  try {
    const project = await prisma.project.create({
      data: {
        id,
        userId,
        title: "新しいWebサイト",
        description: "",
      },
    });

    return { project, error: null };
  } catch (e) {
    console.error(e);
    return { project: null, error: ActionError.DatabaseError };
  }
}

export async function editProject({
  id,
  title,
  description,
  faviconId,
  thumbnailId,
}: z.infer<typeof editProjectSchema>) {
  try {
    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        faviconId,
        thumbnailId,
      },
    });
    return { project, error: null };
  } catch (e) {
    console.error(e);
    return { project: null, error: ActionError.DatabaseError };
  }
}

export function deleteProject({ id }: z.infer<typeof deleteProjectSchema>) {
  try {
    const project = prisma.project.delete({
      where: {
        id,
      },
    });

    return { project, error: null };
  } catch (e) {
    console.error(e);
    return { project: null, error: ActionError.DatabaseError };
  }
}
