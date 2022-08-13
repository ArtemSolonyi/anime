import {Module} from '@nestjs/common';
import {ItemsService} from './items.service';
import {ItemsController} from './items.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Item} from "./entities/item.entity";
import {ItemGenre} from "./entities/item_genre.entity";
import {Genre} from "../genre/genre.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Item])
        , TypeOrmModule.forFeature([ItemGenre]),
        TypeOrmModule.forFeature([Genre])],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule {
}
