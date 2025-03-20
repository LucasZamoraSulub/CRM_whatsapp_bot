import mysql from "mysql2/promise";
import { config } from "./config";

export const poolPromise = mysql.createPool({
  host: config.server,
  user: config.user,
  password: config.password,
  database: config.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default poolPromise;
