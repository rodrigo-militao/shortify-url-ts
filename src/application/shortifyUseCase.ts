import { Url } from "../domain/url.entity";
import { ShortifyRequest, validate } from "../domain/validations/shortifyValidaton";
import { getByLongUrl } from "../infra/repository/urlRepository";
import { Result } from "../types";
import newDomainUseCase from "./newDomainUseCase";

export default async (input: ShortifyRequest): Promise<Result<Url>> => {
  const validationResult = validate(input)
  if (!validationResult.success)
    return { success: false, error: validationResult.error }

  const getByLongUrlResult = await getByLongUrl(input.longUrl);
  if (getByLongUrlResult.success)
    return { success: true, data: getByLongUrlResult.data }

  const newDomainResult = await newDomainUseCase(input.longUrl);
  if (newDomainResult.success)
    return {success: true, data: newDomainResult.data}

  return { success: false, error: newDomainResult.error }
}
