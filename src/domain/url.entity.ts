import crypto from "crypto";
import { RowDataPacket } from "mysql2"


export interface IURL extends RowDataPacket {
  readonly urlId: string;
  longUrl: string;
  shortUrl: string;
}


export class Url  {
  public readonly urlId: string;
  public longUrl: string;
  public shortUrl: string;

  constructor(longUrl: string, shortUrl: string) {
    this.urlId = crypto.randomUUID();
    this.longUrl = longUrl;
    this.shortUrl = shortUrl;
  }
}