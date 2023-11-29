import { z } from "zod";

export const addProjectSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
});

export const editProjectSchema = z.object({
  id: z.string().cuid(),
  title: z.string().optional(),
  description: z.string().optional(),
  faviconId: z.string().cuid().optional(),
  thumbnailId: z.string().cuid().optional(),
});

export const deleteProjectSchema = z.object({
  id: z.string().cuid(),
});
