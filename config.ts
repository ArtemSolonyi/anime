import * as dotenv from "dotenv"
dotenv.config()
export const typeSettingsMySql:any ={
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ["dist/**/*.entity.js"],
    synchronize: false,
    migrations: ['./src/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
}

