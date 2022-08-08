import {MigrationInterface, QueryRunner, TableColumn} from "typeorm"

export class AddFieldEmailToProfile1659944121101 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('profile', new TableColumn({name: 'emailIsActivated', type: "boolean",default:false}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
