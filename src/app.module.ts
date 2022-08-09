import {MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ItemsModule} from './items/items.module';
import {APP_PIPE} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm"
import {Item} from "./items/entities/item";
import {User} from "./users/entities/user";
import {Token} from "./token/entity/token";
import {AuthModule} from "./authorizhation/auth.module";
import {TokenModule} from "./token/token.module";
import {isAuthorized} from "./authorizhation/guards/jwtDecode";
import {ItemsController} from "./items/items.controller";
import {JwtDecodeModule} from "./authorizhation/guards/jwtDecode.module";
import {JwtModule} from "@nestjs/jwt";
import {Profile} from "./profile/profile.entity";
import {ProfileModule} from "./profile/profile.module";
import {MailModule} from "./sendMailer/mail.module";
import {ProfileController} from "./profile/profile.controller";
import { SettingsModule } from './settings/settings.module';
import {Setting} from "./settings/entities/setting.entity";


@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [Item,User,Token,Profile,Setting],
        synchronize: false,
        migrations: ['./src/migrations'],
        migrationsTableName: "custom_migration_table",
    }), ItemsModule,
        AuthModule,
        TokenModule,
        JwtModule,
        JwtDecodeModule,
        ProfileModule,
        SettingsModule,
        ],
    controllers: [AppController],
    providers: [{
        provide: APP_PIPE,
        useClass: ValidationPipe,
    }, AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(isAuthorized).forRoutes(ItemsController,ProfileController)

    }
}

