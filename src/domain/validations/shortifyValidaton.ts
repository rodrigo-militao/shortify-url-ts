import { z } from "zod"
import { Result } from "../../types";

export const ShortifySchema = z.object({
  longUrl: z.string().min(1),
})

export type ShortifyRequest = z.infer<typeof ShortifySchema>

export const validate = (input: unknown): Result<ShortifyRequest> =>
  ShortifySchema.safeParse(input);