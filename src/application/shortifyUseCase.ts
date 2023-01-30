import Hashids from 'hashids';
import { Url } from "../domain/url.entity";
import { ShortifyRequest, validate } from "../domain/validations/shortifyValidaton";
import { getByLongUrl, save } from "../infra/repository/urlRepository";
import { Result } from "../types";

const DEFAULT_URL = process.env.MYURL || "https://myUrl.com/";
const DAYS_TO_EXPIRE = Number(process.env.DAYSTOEXPIRE) || 10;

export default async (input: ShortifyRequest): Promise<Result<Url>> => {
  const validationResult = validate(input)
  if (!validationResult.success)
    return { success: false, error: validationResult.error }

  const getByLongUrlResult = await getByLongUrl(input.longUrl);
  if (getByLongUrlResult.success)
    return { success: true, data: getByLongUrlResult.data }

  const newDomainResult = await generateNewDomain(input.longUrl);
  if (newDomainResult.success)
    return {success: true, data: newDomainResult.data}

  return { success: false, error: newDomainResult.error }
}

const randomId = (): string => new Date().getTime().toString();
const expirationDate = () => new Date(Date.now() + DAYS_TO_EXPIRE * 24*60*60*1000);

const generateNewDomain = async (longUrl: string) : Promise<Result<Url>> => {
  const hashids = new Hashids();
  const uniqueId = randomId();
  const encondedId = hashids.encode(uniqueId);

  const url:Url = {
    urlId: uniqueId,
    shortUrl: DEFAULT_URL + encondedId,
    expiresAt: expirationDate(),
    longUrl
  };

  const resultSave = await save(url);

  return resultSave 
  ? {success: true, data: url}
  : {success: false, error: "error while saving url"};
}