import {AfterLoad, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
@Entity()
export class Friend {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({select: false})
    userId: number
    @Column()
    blackList: boolean
    @Column({default: false,array:true})
    favourite: boolean
    @Column()
    friendId: number

    @ManyToOne(() => User, (user) => user.friend)
    @JoinColumn({name: 'friendId'})
    friends: User
}
