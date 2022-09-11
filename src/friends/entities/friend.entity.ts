import {AfterLoad, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
enum RelationStatus {

}
@Entity()
export class Friend {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({select: true})
    userId: number
    @Column()
    blackList: boolean
    @Column({default: false,array:true})
    favourite: boolean
    @Column()
    friendId: number
    @Column()
    myConfirmation:boolean
    @Column()
    friendConfirmation:boolean
    @ManyToOne(() => User, (user) => user.friend)
    @JoinColumn({name: 'friendId'})
    friendInfo: User
}
