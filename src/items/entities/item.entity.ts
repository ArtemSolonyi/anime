import {Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany} from 'typeorm';
import {ItemGenre} from "./item_genre.entity";

@Entity()
export class Item {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    title: string
    @Column()
    studio: string
    @Column()
    description: string
    @Column()
    author: string
    @Column()
    season: string
    @Column()
    year: number
    @Column()
    userId: number
    @Column()
    image: string
    @Column()
    typeInfo: string
    @Column()
    watchStatus: string
    @Column()
    favourite: boolean

    @OneToMany(()=>ItemGenre,(itemGenre)=>itemGenre.item,)
    itemGenre:ItemGenre[]

}