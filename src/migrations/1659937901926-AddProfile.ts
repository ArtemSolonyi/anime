import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class AddProfile1659937901926 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
                name: 'Profile', columns:
                    [
                        {name: 'id', type: "serial", isPrimary: true},
                        {name: 'userId', type: 'int'},
                        {name: 'avatar', type: 'text'},

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
