import { z } from "zod"
import { ValidateResult } from "../../../types";

enum ExpiresAt {
  One = 1,
  Five = 5,
  Ten = 10
}

export const ShortifySchema = z.object({
  url: z.string().min(1),
  isTemporary: z.boolean(),
  expiresAt: z.nativeEnum(ExpiresAt)
})

export type ShortifyRequest = z.infer<typeof ShortifySchema>

export const validate = (input: unknown): ValidateResult<ShortifyRequest> =>
  ShortifySchema.safeParse(input);