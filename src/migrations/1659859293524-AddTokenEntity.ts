import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class AddTokenEntity1659859293524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
                name: 'Token', columns:
                    [
                        {name: 'id', type: "serial", isPrimary: true},
                        {name: 'accessToken', type: 'text'},
                        {name: 'refreshToken', type: 'text'},
                        {name: 'userId', type: 'int'},

                    ], foreignKeys: [new TableForeignKey({
                    columnNames: ["userId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "User",
                    onDelete: "CASCADE",
                })]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
