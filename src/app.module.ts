import {Module, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ItemsModule} from './items/items.module';
import {APP_PIPE} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm"
import {ItemEntity} from "./items/entities/itemEntity";
import {User} from "./users/entities/user";
import {Token} from "./token/entity/token";
import {AuthModule} from "./authorizhation/auth.module";
import {TokenModule} from "./token/token.module";


@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [ItemEntity,User,Token],
        synchronize: false,
        migrations: ['./src/migrations'],
        migrationsTableName: "custom_migration_table",
    }), ItemsModule,AuthModule,TokenModule],
    controllers: [AppController],
    providers: [{
        provide: APP_PIPE,
        useClass: ValidationPipe,
    }, AppService],
})
export class AppModule {}
