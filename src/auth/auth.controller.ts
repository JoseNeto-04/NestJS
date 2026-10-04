import { Body, Controller, Post, UseGuards, } from "@nestjs/common";
import { User } from "src/decorators/user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";



@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO) {

        return this.authService.login(email, password)

    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {

        return this.authService.register(body)

    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {

        return this.authService.forget(email)

    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO) {

        return this.authService.reset(password, token)

    }
    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {
   
         return {user}
    }



}