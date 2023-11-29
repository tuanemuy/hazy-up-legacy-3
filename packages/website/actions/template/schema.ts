import { z } from "zod";

export const getTemplateSchema = z.object({
  id: z.string().cuid(),
});
