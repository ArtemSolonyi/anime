import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm"

export class AddMisingColumns1658779096426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Item", columns: [ {
                name: "id", type: "serial", isPrimary: true
            },
                {
                    name: 'title', type: "text"
                },
                {
                    name: 'genre', type: "varchar"
                },
                {
                    name: 'studio', type: "text"
                },
                {
                    name: 'description', type: "text"
                },
                {
                    name: 'author', type: "varchar"
                },
                {
                    name: 'season', type: "varchar"
                },
                {
                    name: 'year', type: "year"
                },
                {
                    name: 'userId', type: "int"
                },
                {
                    name: 'image', type: "text"
                },
                {
                    name: 'typeInfo', type: "text"
                },
                {
                    name: 'watchStatus', type: "varchar"
                },
            ]
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
