import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id: string
    @Column()
    userId: number
    @Column()
    passwordConfirmationCode: number
    @Column()
    accessToChangingPassword:boolean
    @Column()
    emailIsActivated:boolean
    @Column()
    tempKeyForActivationEmail:string
}
