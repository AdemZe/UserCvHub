import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './entities/user.entity';
import { CordonneUserLogin } from './dto/login-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



  @Post()
  async register (  @Body() userData : RegisterUserDto ): Promise<Partial <UserEntity> >{

    return await this.userService.registerUser(userData);

  }


  @Get()
  async getAllUsers(){
    return this.userService.returnAllUsers()
  }



  @Post("login")
  login( @Body()  cordonne :CordonneUserLogin    ){
    return this.userService.loginUser(cordonne);

  }



}
