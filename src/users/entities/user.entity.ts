import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @Column({select: false})
    @PrimaryGeneratedColumn()
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

}

