import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class CreateTableSetting1660125553275 implements MigrationInterface {

        public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Setting', columns: [
                {name: "id", type: "int", isPrimary: true, generationStrategy: 'increment'},
                {name: 'userId', type: "int"},
                {name: 'passwordConfirmationCode', type: 'int'},
                {name:"accessToChangingPassword",type:'boolean'},
                {name:"emailIsActivated",type:'boolean'},
                {name:"tempKeyForActivationEmail",type:'text'},
                ],
            foreignKeys: [new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "User",
                onDelete: "CASCADE",
            })]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
