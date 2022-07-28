import {Inject, Injectable} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Item} from "./entities/item.entity";
import {Repository} from "typeorm";


@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private itemRepository: Repository<Item>) {}


  create(createItemDto: CreateItemDto) {
    console.log(this.itemRepository.find())
    return 'This action adds a new item';
  }

  findAll() {
    return `This action returns all items`;
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
