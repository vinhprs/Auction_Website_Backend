import "dotenv/config";
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "https://freshauc.netlify.app",
      "https://www.sandbox.paypal.com",
      "http://freshauc.xyz/"
    ],
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(graphqlUploadExpress({maxFileSize: 9999999999, maxFile: 10}));
  await app.listen(+process.env.PORT || 3000, () => console.log(`App is ruuning on http://localhost:${3000}/graphql `));
}
bootstrap();
