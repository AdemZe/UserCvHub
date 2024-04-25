import {  MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlwares/first.middleware';
import { Logger } from './middlwares/logger.middleware';
import { ConfigModule,  } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';




// pour permet de lire le contenus de variables d'environements   
dotenv.config()

@Module({
  imports: [



    TypeOrmModule.forRoot({
      type: 'postgres' ,
      host: process.env.DB_HOST ,
      port: parseInt(process.env.DB_PORT) ,
      username: process.env.DB_USERNAME , 
      password: process.env.DB_PASSWORD ,
      database: process.env.DB_DATABASE ,
      autoLoadEntities : true ,
      //retryDelay  :3000 ,
      //retryAttempts:10 ,
      synchronize: true ,
    }),  


    TodoModule,
    CvModule,

    ConfigModule.forRoot(
     { isGlobal : true }
    ),

    UserModule,

    
  
  ],
  controllers: [AppController],
  providers: [AppService, ],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply( FirstMiddleware ).forRoutes(
    { path:"todo*",method : RequestMethod.GET } , 
    { path:"todo*",method : RequestMethod.DELETE }
    )
    consumer.apply(Logger ).forRoutes(
    { path:"todo*",method : RequestMethod.ALL } 
    )
  }

  


}
