import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { TimeStampEntity } from "src/Generics/timestamp.entites";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class CvEntity extends TimeStampEntity {

   @PrimaryGeneratedColumn()
    id:number;

    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(4)
    @IsString()
    @Column()
    name:string;

    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(4)
    @IsString()
    @Column()
    firstname:string;


    @IsNotEmpty()
    @IsNumber()
    @Column()
    age : number;

    
    @IsNumber()
    @IsNotEmpty()
    @Column()
    cin:number;

    
    @MaxLength(15)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    @Column()
    job:string


    @IsNotEmpty()
    @IsString()
    @Column()
    path:string;

    @JoinTable()
    @ManyToOne(
        type => UserEntity,
        user => user.cvs , 
        {
            cascade: ['insert', 'update'],
            nullable: true,
            eager: true
          }
       
    )

    user: UserEntity;
   




}
