import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthDto, AuthLoginDto, AuthRefreshDto} from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @Post('/register')
    private async register(@Body() body: AuthDto) {
        return await this.authService.getRegisteredUser(body)
    }
    @Post('/login')
    private async login(@Body() body:AuthLoginDto){
        return await this.authService.login(body)
    }
    @Post('/refresh')
    private async refresh(@Body() body:AuthRefreshDto) {
        return await this.authService.refresh(body)
    }
}