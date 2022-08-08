import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    userId:number
    @Column()
    emailIsActivated:boolean
    @Column()
    tempKeyForActivationEmail:string
    @Column()
    avatar:string
}