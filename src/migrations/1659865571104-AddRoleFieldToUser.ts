import {MigrationInterface, QueryRunner, TableColumn} from "typeorm"

export class AddRoleFieldToUser1659865571104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.addColumn('user',new TableColumn({name:'role',type:'varchar'}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
