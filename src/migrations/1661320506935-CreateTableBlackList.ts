import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class CreateTableBlackList1661320506935 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'blacklist',
                columns: [
                    {name: "id", type: 'int',generationStrategy: 'increment',  isGenerated: true, isPrimary: true},
                    {name: 'userId', type: 'int'}],
                foreignKeys: [new TableForeignKey({
                    columnNames: ["userId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "user",
                    onDelete: "CASCADE",
                })]
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
