import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class CreateTableAcceptanceToFriendList1662899744344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'acceptance_to_friend_list',
                columns: [
                    {name: "id", type: 'int',generationStrategy: 'increment',  isGenerated: true, isPrimary: true},
                    {name:'myConfirmation',type:'boolean'},
                    {name:'friendConfirmation',type:'boolean'},
                    {name: 'userId', type: 'int'},
                    {name: 'friendId', type: 'int'}],
                foreignKeys: [new TableForeignKey({
                    columnNames: ["userId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "user",
                    onDelete: "CASCADE",
                }),new TableForeignKey({
                    columnNames: ["friendId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "user",
                    onDelete: "CASCADE",
                })]
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
