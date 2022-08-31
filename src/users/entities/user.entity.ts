import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, OneToMany} from 'typeorm';
import {Profile} from "../../profile/entities/profile.entity";
import {Friend} from "../../friends/entities/friend.entity";

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
    @OneToMany(()=>Friend,(friend)=>friend.friends)
    friend:Friend[]
}

