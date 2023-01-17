import { ZodError } from "zod";

export interface Result {
  isSuccess?: boolean;
  isFailure?: boolean;
  value?: unknown;
  error?: unknown;
}

export type ValidateResult<T> = 
{ success: true; data: T; } | { success: false; error: ZodError; }

