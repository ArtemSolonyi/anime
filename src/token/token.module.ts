import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Token} from "./entity/token";
import {ItemsService} from "../items/items.service";
import {TokenService} from "./token.service";
import {AuthModule} from "../authorizhation/auth.module";


@Module({
    imports:[TypeOrmModule.forFeature([Token]),forwardRef(()=>AuthModule)],
    providers: [TokenService],
    exports:[TokenService]
})
export class TokenModule {
}
