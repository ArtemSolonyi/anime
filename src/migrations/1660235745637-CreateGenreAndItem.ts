import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class CreateGenreAndItem1660235745637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'item_genre', columns: [
                {name: "id", type: "int", isPrimary: true, generationStrategy: 'increment', isGenerated: true},
                {name: "itemId", type: "int",},
                {name: "genreId", type: "int",}
            ], foreignKeys: [new TableForeignKey({
                columnNames: ["itemId"],
                referencedColumnNames: ["id"],
                referencedTableName: "item",
                onDelete: "CASCADE",

            }), new TableForeignKey({
                columnNames: ["genreId"],
                referencedColumnNames: ["id"],
                referencedTableName: "genre",
                onDelete: "CASCADE",
            })]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
