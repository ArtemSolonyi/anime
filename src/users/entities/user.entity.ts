import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {Profile} from "../../profile/entities/profile.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    username: string
    @Column()
    nickname: string
    @Column()
    email: string
    @Column({select: false})
    password: string
    @Column()
    role: string
    @OneToOne(()=>Profile,(profile)=>profile.user)
    profile:Profile

}

