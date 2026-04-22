import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'node:path';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

let app: NestExpressApplication;

async function bootstrap() {
  if (app) return app;

  app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(new ValidationPipe());

  // In serverless environment, path issues might occur for static assets
  // We point them relative to the root or dist
  app.useStaticAssets(path.join(process.cwd(), 'public'));
  app.setBaseViewsDir(path.join(process.cwd(), 'views'));
  app.setViewEngine('ejs');

  app.setGlobalPrefix('api', { exclude: ['admin', 'admin/(.*)', ''] });

  const config = new DocumentBuilder()
    .setTitle('Air Pollution API')
    .setDescription('The Air Pollution Monitoring System API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();
  return app;
}

export default async (req: any, res: any) => {
  const instance = await bootstrap();
  const server = instance.getHttpAdapter().getInstance();
  server(req, res);
};
