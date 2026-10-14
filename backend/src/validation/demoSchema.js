import { z } from "zod";
export const demoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .regex(/^[\p{L}\p{M}\s.'’\-]+$/u),
  lastName: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .regex(/^[\p{L}\p{M}\s.'’\-]+$/u),
  email: z
    .string()
    .trim()
    .email()
    .max(254)
    .transform((v) => v.toLowerCase()),
  consent: z.literal(true),
  locale: z.enum(["ru", "en", "kk"]),
  website: z.string().max(0).optional(),
});
