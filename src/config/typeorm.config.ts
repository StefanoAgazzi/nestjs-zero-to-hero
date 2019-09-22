import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'taskmanager',
  password: 'taskmanager',
  database: 'taskmanager',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
