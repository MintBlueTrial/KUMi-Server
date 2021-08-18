import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUser } from './app.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('id') id): string {
    return this.appService.getHello(id);
  }

  @Post()
  getTypeScript(@Body() CreateUser: CreateUser ): object {
    return this.appService.getTypeScript(CreateUser)
  }
}
