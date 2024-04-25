import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class RegisterUserDto {

@IsNotEmpty()
@IsString()    
username:string 

@IsEmail()
@IsNotEmpty()
@IsString()    
email:string ;


@IsString()    
@IsNotEmpty()
password: string ;


}
