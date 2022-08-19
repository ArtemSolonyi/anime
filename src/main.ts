import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import {AppDataSource} from "./ormconfig";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await AppDataSource.initialize()
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.setGlobalPrefix('/api/v1/',)
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
