import { Dog } from 'src/dogs/entities/dog.entity';
import { User } from 'src/users/entities/user.entity';
import { ItemCount } from '../item-counts/entities/item-count.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const sslReject =
  process.env.MODE === 'Production'
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : null;

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: [User, Dog, ItemCount],
  ...sslReject,
  synchronize: true,
};

export default config;
