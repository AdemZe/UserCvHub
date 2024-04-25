import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from '../interfaces/interface.payload';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(

    private configservice : ConfigService,
    
    @InjectRepository(UserEntity)
    private readonly userRepo : Repository<UserEntity>
    ){
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configservice.get("SECRET"),
    });
    }

    async validate(payload: PayloadInterface) {
        //j'ai récupéré mon user 
        const user = await this.userRepo.findOneBy( { username : payload.username})

        if (user){
            
            const {password , salt,...result}= user ;
            return result;

        }else {
            throw new UnauthorizedException();
        }

    }
}   