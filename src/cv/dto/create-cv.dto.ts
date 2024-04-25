import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCvDto {



    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(4)
    @IsString()
    name:string;

    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(4)
    @IsString()
    firstname:string;


    @IsNotEmpty()
    @IsNumber()
    age : number;

    
    @IsNumber()
    @IsNotEmpty()
    cin:number;

    
    @MaxLength(15)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    job:string


    @IsNotEmpty()
    @IsString()
    path:string;





}
