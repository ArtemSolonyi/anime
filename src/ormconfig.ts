import {DataSource} from "typeorm";
import {Item} from "./items/entities/item.entity";
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
    entities: [Item],
    migrations: ['./src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscriber/**/*{.ts,.js}'],
})
