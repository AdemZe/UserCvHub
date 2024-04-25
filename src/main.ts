import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { DurationInterceptor } from './interceptors/first.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // creer une instance de ConfigService
  const configService = app.get(ConfigService)

  app.use(morgan('dev'));
  app.useGlobalPipes(   new ValidationPipe ( {   
      whitelist:true ,
      forbidNonWhitelisted: true ,  
      }    )    );
  app.useGlobalInterceptors(new DurationInterceptor());
   
  //utiliser cette instance 
  await app.listen(configService.get("APP_PORT"));
}
bootstrap();
