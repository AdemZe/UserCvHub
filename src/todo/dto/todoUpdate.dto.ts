import { PartialType } from "@nestjs/mapped-types";
import { TodoCreateDto } from "./todoCreate.dto";
import { ApiProperty } from '@nestjs/swagger';

export class TodoUpdateDto extends PartialType(TodoCreateDto){


  


}





