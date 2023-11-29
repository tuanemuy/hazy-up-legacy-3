import { z } from "zod";
import { DBOrder } from "db";

export const getSchema = z.object({
  perPage: z.number(),
  page: z.number(),
  order: z.enum([DBOrder.ASC, DBOrder.DESC]),
  orderBy: z.string().min(1),
  id: z.string().min(1).nullish(),
  name: z.string().min(1).nullish(),
});

export const addOrEditSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  thumbnailId: z.string().cuid().nullish(),
  structure: z.string(),
});

export const removeSchema = z.object({
  id: z.string().cuid(),
});

export const ActionError = {
  DuplicateNameError: "duplicate-name",
  NotFoundError: "not-found",
  DatabaseError: "database-error",
  S3Error: "s3-error",
  ImageConvesionError: "image-conversion-error",
} as const;
export type ActionError = (typeof ActionError)[keyof typeof ActionError];
