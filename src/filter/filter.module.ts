import {DynamicModule, Module, Provider} from "@nestjs/common";

import {FilterService} from "./filter.service";

@Module({
    imports: [],
    exports: [FilterService],
    providers: [FilterService],
})
export class FilterModule {
    static forRoot(): DynamicModule {
        const filter = new FilterService();

        const filterProvider: Provider = {
            provide: 'FILTER',
            useValue:filter
        }
        return {
            module:FilterModule,
            providers:[filterProvider],
            exports:[filterProvider],
            global:true
        }
    }
}