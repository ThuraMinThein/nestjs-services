import { Dog } from 'src/dogs/entities/dog.entity';
import { User } from 'src/users/entities/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { ItemCount } from '../item-counts/entities/item-count.entity';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: +process.env.PORT,
  username: process.env.MYSQLUSERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [User, Dog, ItemCount],
  synchronize: true,
};

export default config;
