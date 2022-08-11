import {ForbiddenException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateItemDto} from './dto/create-item.dto';
import {UpdateItemDto} from './dto/update-item.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Item} from "./entities/item.entity";
import {Repository} from "typeorm";


@Injectable()
export class ItemsService {
    constructor(@InjectRepository(Item) private itemRepository: Repository<Item>) {
    }

    async create(createItemDto: CreateItemDto) {
        const item = await this.itemRepository.create(createItemDto)
        return await this.itemRepository.save(item)
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

    async remove(id:number,userId:number) {
        const removeItem = await this.itemRepository.createQueryBuilder('item')
            .where('item.id =:id',{id:id})
            .andWhere('item.userId=:userId',{userId:userId})
            .delete()
            .execute()
        if (removeItem.affected===1) {
            throw new HttpException("Item was successfully delete", HttpStatus.OK)
        } else {
            throw new HttpException("Item wasn't delete", HttpStatus.NOT_FOUND)
        }
    }
}
