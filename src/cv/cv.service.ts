import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/enums/user-role.enum';


@Injectable()
export class CvService {  
    constructor(
        @InjectRepository(CvEntity)  
        private readonly cvRepo : Repository<CvEntity> ,
        private userService: UserService,
        
    ) {}


    async getcvs(user ) : Promise<CvEntity[]>    {
        if (user.role === UserRole.Admin)
            return await this.cvRepo.find();

        return await this.cvRepo.find();

    }

    async createCv( newCv : CreateCvDto  , user ) :Promise<CvEntity> {
        
        const cv = this.cvRepo.create(newCv)
        cv.user= user
        await this.cvRepo.save(cv);
        return cv;

    }



    async modifierCv(id:number , updateCv: UpdateCvDto, user):Promise<CvEntity>{
        
        // chercher cv d'id = id dans la base de donnée
        const cv = await this.cvRepo.preload({
            id,
            ...updateCv
        });
        // if cette id n'existe pas lancer une erreur 
        if (!cv){
            throw new NotFoundException(` L'id = ${id} n'existe pas dans la base de donneé `);
        }

        // sionon il faut sauvgarder les changements
         
        return  await this.cvRepo.save(cv);

    }


       

   async  removeCv( id:any ):Promise<CvEntity> {

    const cvToRemove = await this.cvRepo.findOne({ where: { id: id } });

       if (!cvToRemove){
        throw new NotFoundException(`L'id = ${id} n'existe pas to remove `)
       }
       console.log (`L'id = ${id} removed `);
       return await this.cvRepo.remove(cvToRemove)


    }




    async softRemove(id : number ){
        const cvSoftRemove= await this.cvRepo.findOne({where : { id : id }})
        if (!cvSoftRemove){
            throw new NotFoundException(`L'id = ${id} n'existe pas to remove `)
        }
        return this.cvRepo.softRemove(cvSoftRemove);

    }


    async recoverCv(id:number ){

        const cvRecovre =  await this.cvRepo.findOne({where : { id : id }})
        if (!cvRecovre){
            throw new NotFoundException(`L'id = ${id} n'existe pas to remove `)
        }
        return this.cvRepo.recover(cvRecovre);

    }


    async statCvNumberByAge( maxAge:number ,minAge: number=0 ){
        // creer un querybuilder
        const qb = this.cvRepo.createQueryBuilder("cv");
        // chercher le nombre de cv par age  
        qb.select("cv.age , count(cv.id) as NombreCvParAge")
        .where("cv.age > :minAge and cv.age < :maxAge")
        .setParameters({maxAge,minAge})
        .groupBy("cv.age")
        console.log(qb.getSql());
        return await qb.getRawMany()


    }







}
