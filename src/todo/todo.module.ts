import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  
  //imports:[ConfigModule],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
