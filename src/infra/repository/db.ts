import { MySQL } from "mysql2-orm";

export default new MySQL({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '12345678',
  database: 'urlshortener'
})
