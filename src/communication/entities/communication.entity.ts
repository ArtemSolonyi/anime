import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Communication {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    userId: number
    @Column()
    blackList:boolean
}
