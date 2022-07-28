import {Module, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ItemsModule} from './items/items.module';
import {APP_PIPE} from "@nestjs/core";


import {TypeOrmModule} from "@nestjs/typeorm"
import {Item} from "./items/entities/item.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [Item],
        synchronize: false,
        migrations: ['./src/migrations'],
        migrationsTableName: "custom_migration_table",
    }), ItemsModule],
    controllers: [AppController],
    providers: [{
        provide: APP_PIPE,
        useClass: ValidationPipe,
    }, AppService],
})
export class AppModule {}
