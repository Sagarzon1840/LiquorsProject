import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env.development' });

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  // host: 'postgresdb',
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/modules/entities/*.entity{.js,.ts}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
  logging: true,
  autoLoadEntities: true,
  synchronize: true,
  dropSchema: false,
};
export default registerAs('typeorm', () => config);

export const connectionSoruce = new DataSource(config as DataSourceOptions);
