import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 统一请求返回成功的数据
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(3000, () => {
    Logger.log('✅ 服务已经正常启动');
  });
}
bootstrap();
