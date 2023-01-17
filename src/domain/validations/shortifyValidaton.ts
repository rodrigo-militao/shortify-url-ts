import { z } from "zod"
import { ValidateResult } from "../../types";

enum ExpiresAt {
  One = 1,
  Five = 5,
  Ten = 10
}

export const ShortifySchema = z.object({
  longUrl: z.string().min(1),
  expiresAt: z.nativeEnum(ExpiresAt)
})

export type ShortifyRequest = z.infer<typeof ShortifySchema>

export const validate = (input: unknown): ValidateResult<ShortifyRequest> =>
  ShortifySchema.safeParse(input);