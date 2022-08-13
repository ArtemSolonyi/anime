import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const fileUpload = require("express-fileupload");
import path from "path";
import { join } from 'path';

import express, {NextFunction,Response,Request} from "express"
import {AppDataSource} from "./ormconfig";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await AppDataSource.initialize()
  app.setGlobalPrefix('/api/v1/',)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
