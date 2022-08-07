import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    accessToken:string;
    @Column()
    refreshToken:string
    @Column()
    userId:number
}