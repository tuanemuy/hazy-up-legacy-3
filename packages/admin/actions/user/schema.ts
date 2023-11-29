import { z } from "zod";
import { Role } from "core/user";
import { DBOrder } from "db";

export const getSchema = z.object({
  perPage: z.number(),
  page: z.number(),
  order: z.enum([DBOrder.ASC, DBOrder.DESC]),
  orderBy: z.string().min(1),
  id: z.string().min(1).nullish(),
  email: z.string().min(1).nullish(),
  role: z.enum([Role.ADMIN, Role.USER]).nullish(),
});

export const addOrEditSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().nullish(),
  email: z.string().email(),
  role: z.enum([Role.ADMIN, Role.USER]),
});

export const removeSchema = z.object({
  id: z.string().cuid(),
});
