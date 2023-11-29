import { z } from "zod";

export const getUserSchema = z.object({
  id: z.string().cuid(),
});
