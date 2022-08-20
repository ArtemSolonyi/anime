import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Friend {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    userId:number

    @Column()
    friendId:number
}
