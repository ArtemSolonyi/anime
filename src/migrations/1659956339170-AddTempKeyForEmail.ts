import {MigrationInterface, QueryRunner, TableColumn} from "typeorm"

export class AddTempKeyForEmail1659956339170 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('profile',new TableColumn({name:"tempKeyForActivationEmail",type:'text'}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
