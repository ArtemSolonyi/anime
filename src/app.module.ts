import {MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe} from '@nestjs/common';
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
import {FileModule} from "./file.controller/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {SettingsController} from "./settings/settings.controller";
import {FilterModule} from "./filter/filter.module";
import {OnlineStatusModule} from './online-status/online-status.module';
import { FriendsModule } from './friends/friends.module';
import {FriendsController} from "./friends/friends.controller";

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
        FilterModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal:true
        }),FileModule, ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'build')
            ,exclude:['/api*'],
        }), OnlineStatusModule, FriendsModule
    ],
    controllers: [],
    providers: [{
        provide: APP_PIPE,
        useClass: ValidationPipe,
    }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {

        consumer.apply(isAuthorized)
            .exclude(
                'api/v1/settings/request/forgot/password',
                'api/v1/settings/sending/forgot/password',
                'api/v1/settings/changing/forgot/password',
                {path:'api/v1/profile',method:RequestMethod.GET}).forRoutes(ItemsController, ProfileController,SettingsController,FriendsController)
    }
}

