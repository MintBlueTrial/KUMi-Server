import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    login(@Body() userInfo: UserDto): object{
        return this.loginService.login(userInfo)
    } 
}
