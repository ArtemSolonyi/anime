import {Injectable} from '@nestjs/common';
import {CreateItemDto} from './dto/create-item.dto';
import {UpdateItemDto} from './dto/update-item.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ItemEntity} from "./entities/itemEntity";
import {Repository} from "typeorm";


@Injectable()
export class ItemsService {
    constructor(@InjectRepository(ItemEntity) private itemRepository: Repository<ItemEntity>) {
    }

    async create(createItemDto: CreateItemDto) {
        const item = this.itemRepository.create(createItemDto)
        return this.itemRepository.save(item)
    }

    findAll() {
        return this.itemRepository.find()
    }

    findOne(id: number) {
        return `This action returns a #${id} item`;
    }

    update(id: number, updateItemDto: UpdateItemDto) {
        return `This action updates a #${id} item`;
    }

    remove(id: number) {
        return `This action removes a #${id} item`;
    }
}
