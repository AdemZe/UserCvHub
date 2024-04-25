
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class TodoCreateDto{
    
    @IsNotEmpty()
    id : number ;

    @MinLength(3)
    @MaxLength(25)
    @IsNotEmpty()
    @IsString()
    userName: string;


    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    description:string;

    @ApiProperty({ type: Date })
    createAt? : Date ;  

    
    @ApiProperty({ type: Date })
    updateAt? : Date ;


}