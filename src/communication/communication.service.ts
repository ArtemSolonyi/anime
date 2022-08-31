import {Injectable} from '@nestjs/common';
import {CreateCommunicationDto} from './dto/create-communication.dto';
import {UpdateCommunicationDto} from './dto/update-communication.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Communication} from "./entities/communication.entity";
import {Repository} from "typeorm";

@Injectable()
export class CommunicationService {
    constructor(@InjectRepository(Communication) private communicationRepository: Repository<Communication>) {
    }

    async create(createCommunicationDto: CreateCommunicationDto) {
        return this.communicationRepository.create()
    }

    findAll() {
        return `This action returns all communication`;
    }

    findOne(id: number) {
        return `This action returns a #${id} communication`;
    }

    update(id: number, updateCommunicationDto: UpdateCommunicationDto) {
        return `This action updates a #${id} communication`;
    }

    remove(id: number) {
        return `This action removes a #${id} communication`;
    }
}
