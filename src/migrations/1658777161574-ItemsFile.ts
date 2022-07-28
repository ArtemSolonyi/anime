import {MigrationInterface, QueryRunner, TableColumn} from "typeorm"

export class ItemsFile1658777161574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await  queryRunner.addColumns('item',[new TableColumn({
          name:'description',type:"text"
      })])

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
