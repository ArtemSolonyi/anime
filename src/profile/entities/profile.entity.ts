import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'int', nullable: true, select: false})
    userId:number
    @OneToOne(()=>User,(user)=>user.profile)
    @JoinColumn({name:"userId"})
    user:User
    @Column()
    avatar:string
}