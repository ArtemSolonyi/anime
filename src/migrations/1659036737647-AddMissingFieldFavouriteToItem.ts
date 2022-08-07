import {MigrationInterface, QueryRunner, TableColumn} from "typeorm"

export class AddMissingFieldFavouriteToItem1659036737647 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("item",new TableColumn({
            name: "favourite",
            type: 'bool'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
