import { z } from "zod";

export const addPageSchema = z.object({
  id: z.string().cuid(),
  projectId: z.string().cuid(),
});

export const editPageSchema = z.object({
  id: z.string().cuid(),
  path: z.string().min(1).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  structure: z.string().min(1).optional(),
});

export const deletePageSchema = z.object({
  id: z.string().cuid(),
});
