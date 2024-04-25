import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv";
import { JwtStrategy } from './strategy/passport-jwt.strategy';



dotenv.config();
@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
  PassportModule,
  JwtModule.register({
    secret: process.env.SECRET ,
    signOptions: { expiresIn: '1h' }
  })  
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]

})
export class UserModule {}
