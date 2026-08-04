import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription(
      'A REST API for managing projects and tasks, built with NestJS, Prisma, and PostgreSQL.',
    )
    .setVersion('1.0.0')
    .addTag('Tasks', 'Create, retrieve, update, filter, and delete tasks')
    .addTag('Projects', 'Create, retrieve, and delete projects')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs-json',
  });

  const configService = app.get(ConfigService);

  const port = configService.getOrThrow<number>('PORT');

  await app.listen(port);
}

void bootstrap();
