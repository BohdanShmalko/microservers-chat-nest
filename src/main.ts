import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@shared/pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Chat back')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`);
  });
}
bootstrap();
