import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Item} from "./item.entity";
import {Genre} from "../../genre/genre.entity";

@Entity()
export class ItemGenre {

    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'int', nullable: true, select: false})
    itemId: number
    @Column({type: 'int', nullable: true, select: false})
    genreId: number
    @ManyToOne(() => Item, (item) => item.itemGenre)
    @JoinColumn({name: "itemId"})
    item: Item
    @ManyToOne(() => Genre, (genre) => genre.genreName)
    @JoinColumn({name: "genreId"})
    genre: Genre
}