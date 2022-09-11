import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
export enum VisibilityProfile{
    ALL='all',
    ONLY_FRIENDS = 'onlyFriends',
    NOTHING='nothing'
}
@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'int', nullable: true, select: false})
    userId:number
    @OneToOne(()=>User,(user)=>user.profile)
    @JoinColumn({name:"userId"})
    user:User
    @Column({default:''})
    avatar:string
    @Column({type:"enum",enum:VisibilityProfile,default:VisibilityProfile.ALL})
    visibilityProfile:VisibilityProfile
}
