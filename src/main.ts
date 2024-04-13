import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envVariables } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envVariables().port);
}
bootstrap();
