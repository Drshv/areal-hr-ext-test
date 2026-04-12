import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config();

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: port,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'hr_db',
  entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
});