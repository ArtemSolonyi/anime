import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ItemGenre} from "../items/entities/item_genre.entity";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    @OneToMany(()=>ItemGenre,(itemGenre)=>itemGenre.genre)
    genreName: string
}