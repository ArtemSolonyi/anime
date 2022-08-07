import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class userTable1659030910433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "User", columns: [
                {
                    name: "id", type: "bigint", isPrimary: true,generationStrategy:'increment'
                },
                {
                    name: 'username', type: "varchar"
                },
                {
                    name: 'email', type: "varchar"
                },
                {
                    name: 'password', type: "text"
                },
               ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
