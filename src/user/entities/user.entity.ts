import { IsEmail, IsNotEmpty, IsString, MAX_DATE, MaxLength, MinLength } from "class-validator";
import { TimeStampEntity } from "src/Generics/timestamp.entites";
import { CvEntity } from "src/cv/entities/cv.entity";
import { UserRole } from "src/enums/user-role.enum";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity extends TimeStampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    
    
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @MinLength(4)
    @Column()
    username: string ;


    @IsEmail()
    @MaxLength(30)
    @MinLength(4)
    @Column()
    email : string ;



    @Column()
    password :string ;

    // nous permet de crypter notre mot de passe 
    @Column()
    salt:string;


    @Column(    {
        type: "enum" ,
        enum: UserRole ,
        default: UserRole.User ,
    })
    role:string ;




    @OneToMany(
        type => CvEntity,
        cv => cv.user , 

    )

    cvs:CvEntity[];








}
