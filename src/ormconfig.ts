import {DataSource} from "typeorm";
import * as dotenv from "dotenv"
import {typeSettingsMySql} from "../config";
dotenv.config()

export const AppDataSource = new DataSource(typeSettingsMySql)

