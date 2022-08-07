import {DataSource} from "typeorm";
import {ItemEntity} from "./items/entities/itemEntity";
export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    logging: false,
    synchronize: false,
    name: 'default',
    entities: [ItemEntity],
    migrations: ['./src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscriber/**/*{.ts,.js}'],
})
