import { Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {isAuthorized} from "./jwtDecode";

@Module({
    imports:[JwtModule],


})
export class JwtDecodeModule{}