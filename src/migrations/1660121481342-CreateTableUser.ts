import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateTableUser1660121481342 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user", columns: [
                {
                    name: "id", type: "int", isPrimary: true,generationStrategy: 'increment',isGenerated:true
                },
                {
                    name: 'username', type: "varchar"
                },
                {
                    name: 'email', type: "varchar"
                },
                {
                    name: 'password', type: "text"
                },
                {
                    name: 'role', type: 'varchar'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
