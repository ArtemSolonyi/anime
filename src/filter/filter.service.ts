import {Injectable} from "@nestjs/common";
import {SelectQueryBuilder} from "typeorm";
import {Item} from "../items/entities/item.entity";

@Injectable()
export class FilterService {
    builder: any = null

    addTable(table: any) {
        this.builder = table
        return this
    }

    addSearch(searchTitleText: string) {
        if (searchTitleText) {
            this.builder = this.builder.andWhere("item.title LIKE '%'  :title  '%'", {title: searchTitleText})
        }
        return this
    }

    addGenre(genre: string[]) {
        if (genre) {
            let genres: number[] = genre.map((e) => Number(e))
            this.builder = this.builder.andWhere('genre.id in (:...ids)', {ids: [genres]})
        }
        return this
    }

    addSeason(season: string[]) {
        if (season) {
            this.builder = this.builder.andWhere('item.season in (:...season)', {season: [season]})
        }
        return this
    }

    addFavourite(favourite: string) {
        if (favourite) {
            this.builder = this.builder.andWhere('item.favourite =:favourite', {favourite: favourite === 'true'})
        }
        return this
    }

    addYear(years: string[]) {
        if (years) {
            let year: number[] = years.map((e) => Number(e))
            this.builder = this.builder.andWhere("item.year in (:...year)", {year: [year]})
        }
        return this
    }

    getMany() {
        this.builder = this.builder.select(['item', 'itemGenre.genreId', 'genre.genreName']).getMany()
        return this
    }

    addWatchStatus(watchStatus: string) {
        if (watchStatus) {
            this.builder = this.builder.andWhere('item.watchStatus =:watchStatus', {watchStatus: watchStatus})
        }
        return this
    }

    async build() {
        return await this.builder
    }
}
