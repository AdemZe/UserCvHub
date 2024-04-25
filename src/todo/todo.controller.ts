import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, Req, Res,   } from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { TodoCreateDto,  } from './dto/todoCreate.dto';
import { TodoUpdateDto } from './dto/todoUpdate.dto';
import { GetPaginatedTodoDto } from './dto/getPaginatedTodo.dto';
import { TodoService } from './todo.service';
import { PartialType } from '@nestjs/mapped-types';
import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion.pipe';
import { ConfigService } from '@nestjs/config';

@Controller('todo')
export class TodoController {
    constructor ( private readonly      todoService : TodoService  ,
                  private readonly      configService : ConfigService ,
                ){}


    @Get()
    getTodos(  @Query()  mesquerparams :GetPaginatedTodoDto
        //@Req()  req : Request , 
        //@Res() res : Response,
    ) 
    { 
        //console.log(req);
        //console.log(res);

        // faire une instance de configservice pour l'utiliser dans ce controller 

       console.log ("le port utiliser est = ", this.configService.get("APP_PORT"));
       return this.todoService.returnAllTodo(mesquerparams);
    
    }


    @Get(":id")
    getTodoById (      @Param("id", ParseIntPipe )    id         ){

       return this.todoService.returnTodoById(id);
    }


    @Post()
    addTodo(   @Body()   newTodo: TodoCreateDto      )
    {
      return this.todoService.ajouteTodo(newTodo);
    }
 

    @Patch(":id")
    modifierTodo( @Param("id", ParseIntPipe ) id , @Body() updateTodo : TodoUpdateDto  ){

        return this.todoService.modifierTodo(id,updateTodo);

    }


    @Delete(":id")
    deleteTodo( @Param("id" , ParseIntPipe ) id    ){
        return this.todoService.removeTodo(id);
    }


    @Post("pipe")
    verifPipe(   @Body( UpperAndFusionPipe ) data  ,      ){ 
        return  data ;

    }




 
}
