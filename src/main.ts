import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await app.listen(3000, () => {
    Logger.log('✅ 服务已经正常启动');
  });
  // 引入全局中间件（Cookie）
  app.use(cookieParser());
}
bootstrap();
