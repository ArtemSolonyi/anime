import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class CreateTableProfile1660125548205 implements MigrationInterface {

        public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
                name: 'profile', columns:
                    [
                        {name: 'id', type: "int", isPrimary: true, generationStrategy: 'increment'},
                        {name: 'userId', type: 'int'},
                        {name: 'avatar', type: 'text'},

                    ], foreignKeys: [new TableForeignKey({
                    columnNames: ["userId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "user",
                    onDelete: "CASCADE",
                })]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
