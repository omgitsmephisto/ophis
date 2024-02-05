// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import * as path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';
import { entities } from './entities';

export const ormOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities,
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
  synchronize: false,
  logging: false,
};

export const AppDataSource = new DataSource(ormOptions);
