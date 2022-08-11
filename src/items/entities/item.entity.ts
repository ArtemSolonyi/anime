import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    title: string
    @Column()
    genre: string
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
    @Column({type:"json"})
    watchStatus: string
    @Column()
    favourite: boolean
}