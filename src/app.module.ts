import {MiddlewareConsumer, Module, NestModule, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ItemsModule} from './items/items.module';
import {APP_PIPE} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm"
import {AuthModule} from "./authorizhation/auth.module";
import {TokenModule} from "./token/token.module";
import {isAuthorized} from "./authorizhation/guards/jwtDecode";
import {ItemsController} from "./items/items.controller";
import {JwtDecodeModule} from "./authorizhation/guards/jwtDecode.module";
import {JwtModule} from "@nestjs/jwt";
import {ProfileModule} from "./profile/profile.module";
import {ProfileController} from "./profile/profile.controller";
import {SettingsModule} from './settings/settings.module';
import {ConfigModule} from "@nestjs/config";
import * as dotenv from "dotenv"
import {typeSettingsMySql} from "../config";
dotenv.config()

@Module({
    imports: [TypeOrmModule.forRoot(typeSettingsMySql),
        ItemsModule,
        AuthModule,
        TokenModule,
        JwtModule,
        JwtDecodeModule,
        ProfileModule,
        SettingsModule,
        ConfigModule.forRoot({
            isGlobal:true
        })
    ],
    controllers: [AppController],
    providers: [{
        provide: APP_PIPE,
        useClass: ValidationPipe,
    }, AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(isAuthorized)
            .exclude(
                'settings/request/forgot/password',
                'settings/sending/forgot/password',
                'settings/sending/forgot/password').forRoutes(ItemsController, ProfileController)

    }
}

