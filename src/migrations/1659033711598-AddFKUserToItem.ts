import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm"

export class AddFKUserToItem1659033711598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "Item",
            new TableForeignKey({
                columnNames: ["user"],
                referencedColumnNames: ["id"],
                referencedTableName: "User",
                onDelete: "CASCADE",
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
