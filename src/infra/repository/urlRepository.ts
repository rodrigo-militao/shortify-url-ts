import { Url } from '../../domain/url.entity';
import { Result } from '../../types';
import db from './db';

export const getByLongUrl = async (longUrl: string): Promise<Result<Url>> => {
  const resultQuery = await db.select({
    table: "url",
    where: '`longUrl` = ?',
    params: [longUrl],
    limit: 1
  }) as Url | false;

  return resultQuery 
  ? { success: true, data: resultQuery } 
  : {success: false, error: "Not found"}
}

export const save = async (url: Url): Promise<boolean> => {
  const resultQuery = await db.insert({
    table: "url",
    values: {...url}
  })

  return resultQuery > 0;
}
