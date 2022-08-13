import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm"

export class CreateGenre1660232383812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'genre', columns: [{
                isPrimary: true,name: 'id', type: 'int', generationStrategy: 'increment', isGenerated: true
            }, {name: 'genreName', type: 'text'}]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
