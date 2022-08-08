import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {ItemsService} from './items.service';
import {CreateItemDto} from './dto/create-item.dto';
import {UpdateItemDto} from './dto/update-item.dto';



@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {
    }

    @Post()
    async create(@Body() createItemDto: CreateItemDto) {
        console.log(createItemDto)
        return await this.itemsService.create(createItemDto);
    }

    @Get()
    findAll() {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.itemsService.findOne(+id);
    }

    @Patch(':id')
    async update(@Body() updateItemDto: UpdateItemDto) {
        return await this.itemsService.update(updateItemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.itemsService.remove(+id);
    }
}
