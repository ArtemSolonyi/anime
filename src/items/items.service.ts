import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    UnprocessableEntityException
} from '@nestjs/common';
import {CreateItemDto} from './dto/create-item.dto';
import {UpdateItemDto} from './dto/update-item.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Item} from "./entities/item.entity";
import {Repository, SelectQueryBuilder} from "typeorm";
import {ItemGenre} from "./entities/item_genre.entity";
import {Genre} from "../genre/genre.entity";
import {FilterService} from "../filter/filter.service";
import {FilterType} from "./types/item.types";


@Injectable()
export class ItemsService {
    constructor(@InjectRepository(Item) private itemRepository: Repository<Item>,
                @InjectRepository(ItemGenre) private itemGenreRepository: Repository<ItemGenre>,
                @InjectRepository(Genre) private genreRepository: Repository<Genre>,
                @Inject('FILTER') private filterService: FilterService) {
    }

    async create(createItemDto: CreateItemDto) {
        const item = await this.itemRepository.create(createItemDto)
        const savedItem = await this.itemRepository.save(item)
        let itemGenres = createItemDto.genre.map((genre) =>
            this.itemGenreRepository.create({
                itemId: savedItem.id,
                genreId: genre.id
            })
        )
        const isExist = await this.genreRepository.createQueryBuilder()
            .where('genre.id in (:...ids)', {ids: createItemDto.genre.map((e) => e.id)})
            .getMany()
        if (isExist.length) {
            await this.itemGenreRepository
                .createQueryBuilder()
                .insert()
                .into(ItemGenre)
                .values(itemGenres)
                .execute()
            return {...savedItem, genre: createItemDto.genre}
        } else {
            throw new UnprocessableEntityException('Genres not exist')
        }

    }

    async filter(queries: FilterType): Promise<FilterService> {
        let table: SelectQueryBuilder<Item> = await this.itemRepository.createQueryBuilder('item')
            .leftJoinAndSelect('item.itemGenre', 'itemGenre')
            .leftJoinAndSelect('itemGenre.genre', 'genre')
            .where({userId: queries.userId})
        return await this.filterService
            .addTable(table)
            .addGenre(queries.genre)
            .addSeason(queries.season)
            .addFavourite(queries.favourite)
            .addYear(queries.year)
            .addWatchStatus(queries.watchStatus)
            .addSearch(queries.searchTitleText)
            .getMany()
            .build()
    }

    async getGenres() {
        return this.genreRepository.find()
    }

    async findAll(userId: number) {
        return await this.itemRepository.findBy({userId: userId})
    }

    findOne(id: number) {
        return `This action returns a #${id} item`;
    }

    async update(updateItemDto: UpdateItemDto) {
        const item = await this.itemRepository.findOne({where: {id: updateItemDto.id, userId: updateItemDto.userId}})
        if (item) {
            return this.itemRepository.save({...item, ...updateItemDto})
        } else {
            throw new ForbiddenException("You don't have permission")
        }
    }

    async remove(id: number, userId: number) {
        const removeItem = await this.itemRepository.createQueryBuilder('item')
            .where('item.id =:id', {id: id})
            .andWhere('item.userId=:userId', {userId: userId})
            .delete()
            .execute()
        if (removeItem.affected === 1) {
            throw new HttpException("Item was successfully delete", HttpStatus.OK)
        } else {
            throw new HttpException("Item wasn't delete", HttpStatus.NOT_FOUND)
        }
    }
}
