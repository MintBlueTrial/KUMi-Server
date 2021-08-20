import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { User } from './login.schema';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    login(@Body() userInfo: User): object{
        return this.loginService.login(userInfo)
    } 
}
