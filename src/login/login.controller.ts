import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { userInfo } from './login.dto'

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    login(@Body() userInfo: userInfo): object{
        return this.loginService.login(userInfo)
    } 
}
