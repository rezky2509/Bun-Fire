import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
  
const poolConnection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  database: process.env.DATABASE,
  supportBigNumbers: true,
  connectionLimit: 10
});
// This is the database pool connection to start query your database
export const db = drizzle({client: poolConnection});

