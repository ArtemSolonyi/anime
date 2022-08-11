import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Head, Query} from '@nestjs/common';
import {ItemsService} from './items.service';
import {CreateItemDto} from './dto/create-item.dto';
import {UpdateItemDto} from './dto/update-item.dto';


@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {
    }

    @Post()
    async create(@Body() createItemDto: CreateItemDto) {
        return await this.itemsService.create(createItemDto);
    }
    @Get('/filter')
    async filter(@Query() genre: any) {
     console.log(genre)
    }
    @Get()
    async findAll(@Body() userId: number) {
        return await this.itemsService.findAll(userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.itemsService.findOne(+id);
    }

    @Patch('')
    async update(@Body() updateItemDto: UpdateItemDto) {
        return await this.itemsService.update(updateItemDto);
    }



    @Delete('')
    async remove(@Query('id') id: string, @Body() body: { userId: number }) {
        return await this.itemsService.remove(+id, body.userId);
    }
}
