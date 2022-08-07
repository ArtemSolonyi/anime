import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ItemEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string
    @Column()
    genre: string
    @Column()
    studio: string
    @Column()
    description:string
    @Column()
    author:string
    @Column()
    season:string
    @Column()
    year:number
    @Column()
    user:number
    @Column()
    image:string
    @Column()
    typeInfo:string
    @Column()
    watchStatus:string
    @Column()
    favourite:boolean
}