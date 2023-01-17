import { IURL, Url } from '../../domain/url.entity';
import db from './db';

export const getByLongUrl = async (longUrl: string): Promise<Url | false> =>
  await <Promise<IURL | false>>db.select({
    table: "url",
    where: '`longUrl` = ?',
    params: [longUrl],
    limit: 1
  })
