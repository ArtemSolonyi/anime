import {Injectable} from '@nestjs/common';
import {CreateItemDto} from './dto/create-item.dto';
import {UpdateItemDto} from './dto/update-item.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Item} from "./entities/item";
import {Repository} from "typeorm";


@Injectable()
export class ItemsService {
    constructor(@InjectRepository(Item) private itemRepository: Repository<Item>) {
    }

    async create(createItemDto: CreateItemDto) {
        const item = await this.itemRepository.create(createItemDto)
        console.log(item)
        return this.itemRepository.save(item)
    }

    findAll() {
        return this.itemRepository.find()
    }

    findOne(id: number) {
        return `This action returns a #${id} item`;
    }

    async update(updateItemDto: UpdateItemDto) {
        return await this.itemRepository.update({id: updateItemDto.id}, updateItemDto)
    }

    remove(id: number) {
        return `This action removes a #${id} item`;
    }
}
