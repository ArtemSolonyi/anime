import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class CreateTableItem1660121621527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "item", columns: [{
                name: "id", type: "int", isPrimary: true,generationStrategy: 'increment'
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
                {
                    name: "favourite", type: 'bool'
                }
            ], foreignKeys: [new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            }),]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
