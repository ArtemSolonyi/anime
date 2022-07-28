import {MigrationInterface, QueryRunner, TableColumn} from "typeorm"

export class AddMisingColumns1658779096426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.addColumns('item',[new TableColumn({
            name:'description',type:"text"
        })])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
