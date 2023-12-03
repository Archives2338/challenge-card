/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import { Handler,Context,Callback } from 'aws-lambda';
import { ValidationPipe } from '@nestjs/common';
let server: Handler;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }
  ));
  await app.init();


  const expressApp=app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}


export const handler: Handler = async (
  event: any,
   context: Context,
   callback: Callback
   ) => {
server = server ?? (await bootstrap());
return server(event, context, callback);
};
