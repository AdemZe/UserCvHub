import { ConflictException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt"
import { CordonneUserLogin } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(     
    @InjectRepository(UserEntity)
    private readonly  userRepo : Repository<UserEntity> ,   
    private readonly jwtservice : JwtService   ) {}



  async registerUser ( userData : RegisterUserDto ) :Promise <Partial<UserEntity>>{

    const user = await this.userRepo.create(
      {
        ...userData
      }
    )
    user.salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, user.salt);

    try{      
      await this.userRepo.save(user)
    }catch (e)
    {
      throw new ConflictException(" username et password doit unique ") 
    }


    
    return {
      id: user.id , 
      username : user.username,
      createdAt:user.createdAt,
      role: user.role 
    }
    //return user ; 

  }
   



  


  async loginUser( cordonne : CordonneUserLogin ){

    const {password , username}={...cordonne};


    const user = await this.userRepo.createQueryBuilder("user")
    .where("user.username = :username  or user.email = :username ")
    .setParameters({password,username})
    .getOne()


    const payload = { 
      username:user.username , 
      email: user.email ,
      role: user.role 
    }

    const hashpassword = await bcrypt.hash( password,user.salt )
    const jwt = await this.jwtservice.sign({ payload })

    if(  !user  ){
      throw new NotFoundException(" user not found in data base  ");
      
    }else{
      console.log(user);
      if ( hashpassword === user.password  ){
        return {
          "access_token": jwt
        }
      }else {
          throw new NotFoundException(" Password incorrect ")
        }  
     }
      




    }



   


  async returnAllUsers() :Promise< Partial <UserEntity[]> >{


    return await this.userRepo.find()



  }

  isOwnerOrAdmin(objet, user) {
    return user.role === UserRole.Admin || (objet.user && objet.user.id === user.id);
  }












}
