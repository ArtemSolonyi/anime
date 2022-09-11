import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Friend} from "./friend.entity";

@Entity()
export class AcceptanceToFriendList {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    myConfirmation: boolean
    @Column()
    friendConfirmation: boolean
    @Column()
    userId: number
    @Column()
    friendId: number
    @ManyToOne(() => User, (user) => user.friend)
    @JoinColumn({name: 'friendId'})
    friend: User
    @ManyToOne(() => User, (user) => user.friend)
    @JoinColumn({name: 'userId'})
    user: User
}