import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoCreateDto } from './dto/todoCreate.dto';
import { TodoUpdateDto } from './dto/todoUpdate.dto';

@Injectable()
export class TodoService {


    todos = [{
        id:1,
        userName:"adem",
        description :"dev backend"
    },{
        id:2,
        userName:"ranim",
        description :"gestionnaire de data "
    }

    ]


    returnAllTodo(mesquerparams: any  ) {
        //console.log(mesquerparams.page);
        //console.log(mesquerparams.item);
        return this.todos; 

    }



    returnTodoById( id  ){
        const todo = this.todos.find(  user => user.id === +id     )
        if (!todo) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        
    return todo 

    }

    ajouteTodo( newTodo: TodoCreateDto ){ 
        const ajoutTodo = this.todos.findIndex(   (todo)=> todo.id === newTodo.id       );
        if(ajoutTodo<0){
            newTodo.createAt=new Date()
            this.todos.push(newTodo)
        }else{
            throw new NotFoundException(`User with ID ${newTodo.id} deja existe  `);
        } 
        return newTodo ;

    }

    modifierTodo(id , updateTodo: TodoUpdateDto ){
        //chercher l'objet de cette id:
        const todo = this.returnTodoById(id);


        // Update objet (2éme methode):
        //this.todos[id]= {...this.todos[id], ...newTodo }

        //changer les variables    
        todo.id = updateTodo.id?  updateTodo.id: todo.id ;
        todo.userName = updateTodo.userName? updateTodo.userName : todo.userName ;
        todo.description = updateTodo.description? updateTodo.description : todo.description ;

        const  { createAt = new Date() ,...newTodo} ={  ...todo ,   updateAt: new Date()          }

        return newTodo ;

    }


    removeTodo(id: number ){
        //chercher l'objet avec cette id
        const index = this.todos.findIndex( (todo)=> todo.id === +id  );

        //suppression de todo
        if (index>=0){
        this.todos.splice(index, 1);
        //erreur
        }else {
        throw new NotFoundException(` le todo d'id ${id} n'existe pas `);
        }
        return `suppresion avec success pour todo d'id ${id} `;
    }







}
