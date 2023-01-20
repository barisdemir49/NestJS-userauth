import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { defaultConf } from './config/default';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as requestIp from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      bodyParser: true,
      cors: true,
    });

  app.use(cors());
  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
  app.use(requestIp.mw());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: false,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  await app.listen(defaultConf.port);
}
bootstrap();
