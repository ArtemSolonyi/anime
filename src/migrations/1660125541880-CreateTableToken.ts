import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class CreateTableToken1660125541880 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
                name: 'Token', columns:
                    [
                        {name: 'id', type: "int", isPrimary: true},
                        {name: 'accessToken', type: 'text'},
                        {name: 'refreshToken', type: 'text'},
                        {name: 'userId', type: 'int'},

                    ], foreignKeys: [new TableForeignKey({
                    name: 'userIdForeignKey',
                    columnNames: ["userId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "User",
                    onDelete: "CASCADE",
                    onUpdate: 'CASCADE'
                })]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
