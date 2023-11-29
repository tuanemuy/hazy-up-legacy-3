"use server";

import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { prisma } from "db";
import {
  NodeMap,
  generateNodeWithID,
  generatePageElement,
  addSection,
} from "document";
import { addPageSchema, editPageSchema, deletePageSchema } from "./schema";
import { ActionError } from "../error";

let initialNodeMap: NodeMap = {
  root: generateNodeWithID({
    id: "root",
    element: generatePageElement({
      name: "",
      path: "",
    }),
  }),
};
initialNodeMap = addSection(initialNodeMap, "root");

export async function addPage({
  id,
  projectId,
}: z.infer<typeof addPageSchema>) {
  try {
    const page = await prisma.page.create({
      data: {
        id,
        projectId,
        path: createId(),
        title: "新しいページ",
        description: "",
        structure: JSON.stringify(initialNodeMap),
      },
    });

    return { page, error: null };
  } catch (e) {
    console.error(e);
    return { page: null, error: ActionError.DatabaseError };
  }
}

export async function editPage({
  id,
  path,
  title,
  description,
  structure,
}: z.infer<typeof editPageSchema>) {
  try {
    const page = await prisma.page.update({
      where: {
        id,
      },
      data: {
        path,
        title,
        description,
        structure,
      },
    });
    return { page, error: null };
  } catch (e) {
    console.error(e);
    return { page: null, error: ActionError.DatabaseError };
  }
}

export function deletePage({ id }: z.infer<typeof deletePageSchema>) {
  try {
    const page = prisma.page.delete({
      where: {
        id,
      },
    });

    return { page, error: null };
  } catch (e) {
    console.error(e);
    return { page: null, error: ActionError.DatabaseError };
  }
}
