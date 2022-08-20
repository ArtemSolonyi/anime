import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class CreateTableFriends1661011199549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
                name: 'friend', columns:
                    [
                        {name: 'id', type: "int", isPrimary: true, generationStrategy: 'increment', isGenerated: true},
                        {name: 'userId', type: 'int'},
                        {name: 'friendId', type: 'int'},

                    ], foreignKeys: [new TableForeignKey({
                    columnNames: ["userId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "user",
                    onDelete: "CASCADE",
                },), new TableForeignKey({
                    columnNames: ["friendId"],
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
