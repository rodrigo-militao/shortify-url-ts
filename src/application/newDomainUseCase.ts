import Hashids from 'hashids';
import { Url } from '../domain/url.entity';
import { save } from '../infra/repository/urlRepository';
import { Result } from '../types';

const DEFAULT_URL = process.env.MYURL || "https://myUrl.com/";
const DAYS_TO_EXPIRE = Number(process.env.DAYSTOEXPIRE) || 10;

const randomId = (): string => new Date().getTime().toString();
const expirationDate = () => new Date(Date.now() + DAYS_TO_EXPIRE * 24*60*60*1000);

export default async (longUrl: string): Promise<Result<Url>> => {
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