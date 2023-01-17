import { Url } from "../domain/url.entity";
import { ShortifyRequest, validate } from "../domain/validations/shortifyValidaton";
import { getByLongUrl } from "../infra/repository/urlRepository";
import { Result } from "../types";

const DEFAULT_URL = process.env.MYURL || "http://localhost:3000/";

export default async (input: ShortifyRequest): Promise<Result> => {
  const validationResult = validate(input)
  
  if (!validationResult.success) {
    return {
      isFailure: true,
      error: validationResult.error
    }
  }

  const getByLongUrlResult = await getByLongUrl(input.longUrl);
  if (getByLongUrlResult)
    return retorno(getByLongUrlResult, input);

  //if not, generate a new domain
  
  return {
    isSuccess: true,
    value: {
      ...input,
      shortifiedUrl: "abcde123"
    }
  }
}

const retorno = (url: Url, input: ShortifyRequest) => {
  return {
    isSuccess: true,
    value: {
      ...input,
      shortifiedUrl: url.shortUrl
    }
  }
}
