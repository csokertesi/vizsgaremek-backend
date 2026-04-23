import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'node:path';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://vizsgaremek-kler.vercel.app',
      /\.vercel\.app$/ // Ez engedélyezi az összes Vercel-es aldomain-t is
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Ez teszi lehetővé a hitelesítést (login)
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(new ValidationPipe());

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
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  // Vercel-en a PORT változót a rendszer adja, lokálisan pedig 3000
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();