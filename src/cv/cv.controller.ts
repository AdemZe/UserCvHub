import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { JwtAuthGuard } from 'src/user/Guards/jwt-auth.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/decorators/user.decorator';
 

@Controller('cv')
export class CvController {

    constructor (private readonly    cvService : CvService      ){}



    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllCV( @User() user  , @Req() request    ): Promise<CvEntity[]>{
        console.log(request.user)

        console.log("bey");
        return await this.cvService.getcvs(user);


    }


    @Post()
    @UseGuards(JwtAuthGuard)
    async addCv(  @Body()  newCv: CreateCvDto ,  @Req() request  ,@User() user ) :Promise<CvEntity> {
        console.log(request.user)
        //const user= request.user
        return await this.cvService.createCv(newCv,user)
      

    }


    @Get("stat")
    @UseGuards(JwtAuthGuard)
    async statsCvNumberById(){
        return await this.cvService.statCvNumberByAge(22);
    }


    @Patch(":id")
    @UseGuards(JwtAuthGuard)
    async updateCv( @User() user, @Param('id',ParseIntPipe ) id:number , @Body()  updateCv: UpdateCvDto      ){

        return  await this.cvService.modifierCv(id,updateCv,user)

    }


    @Delete(":id")
    async remove(@Param("id",ParseIntPipe )    id:number    ):Promise<CvEntity>{
        return await this.cvService.removeCv(id);

    }


    @Delete("soft/:id")
    async softRemove(@Param("id",ParseIntPipe )    id:number    ):Promise<CvEntity>{
        return await this.cvService.softRemove(id);

    }


    @Get("soft/:id")
    async softRecovre(@Param("id",ParseIntPipe )    id:number    ):Promise<CvEntity>{
        return await this.cvService.recoverCv(id);

    }









}
