import {Module} from "@nestjs/common";
import {FileController} from "./file.controller";


@Module({
    imports:[],
    controllers: [FileController],
    providers: [FileController],
})
export class FileModule {}