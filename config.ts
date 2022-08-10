import * as dotenv from "dotenv"

import { join } from 'path';
dotenv.config()
export const typeSettingsMySql:any ={
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ["dist/**/*.entity.js"],
    logging:true,
    autoLoadEntities: true,
    migrationsRun:true,
    cli:{migrationsDir:'anime-back/src/migrations'},
    synchronize: false,
    migrations: [join(__dirname,'../migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations',

}

