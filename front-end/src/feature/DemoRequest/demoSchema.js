import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(1)
  .max(80)
  .regex(/^[\p{L}\p{M}\s.'’\-]+$/u);

export const demoSchema = z.object({
  firstName: nameSchema,

  lastName: nameSchema,

  email: z
    .string()
    .trim()
    .email()
    .max(254)
    .transform((value) => value.toLowerCase()),

  consent: z.literal(true),

  locale: z.enum(["ru", "en", "kk"]),

  website: z.string().max(0).optional(),
});