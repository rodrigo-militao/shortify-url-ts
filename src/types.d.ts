import { ZodError } from "zod";

export interface Result {
  isSuccess?: boolean;
  isFailure?: boolean;
  value?: unknown;
  message?: string;
}

export type ValidateResult<T> = 
{ success: true; data: T; } | { success: false; error: ZodError; }

export interface ShortifyRequest {
  url: string;
  isTemporary: boolean;
  expiresAt?: 1 | 5 | 10;
}

export interface ShortifiedValue {
  request: ShortifyRequest;
  shortifiedUrl: string;
}

export interface ShortifyResponse {
  value: ShortifiedValue;
  code: 200;
}

