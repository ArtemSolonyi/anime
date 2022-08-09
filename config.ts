import * as dotenv from "dotenv"
import {Item} from "./src/items/entities/item";
import {Setting} from "./src/settings/entities/setting.entity";
import {Profile} from "./src/profile/profile.entity";
import { Token } from "src/token/entity/token";
import { User } from "src/users/entities/user";
dotenv.config()
export const typeSettingsMySql:any =
{
    type: 'mysql',
    host: process.env.HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [],
    synchronize: false,
    migrations: ['./src/migrations'],
    migrationsTableName: "custom_migration_table",
}

