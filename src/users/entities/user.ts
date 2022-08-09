// username: {
//     unique: true,
//         type: String,
//         required: [true, "Must provide Username"],
//         minlength: [3, "Short nickname will be highly them 3 symbols"],
//         maxlength: [18, "Long nickname will be lowly them 18 symbols"],
// },
// email: {
//     unique: true,
//         type: String,
//         required: [true, "must provide email"],
//         minLength: [5, "Short email"],
//         validate: {
//         validator: validator.isEmail,
//             message: "Please provide valid email",
//     },
// },
// password: {
//     type: String,
//         required: [true, "must provide password"],
//         minlength: [7, "Short password"],
// },
// activateEmail: {
//     type: Boolean,
// default:false
// },
// tempKeyForEmail: {
//     type: String
// },
// tempKeyToEmailChange:{
//     type:String
// },
// possiblyEmail:{
//     type:String
// }
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
@PrimaryGeneratedColumn()
    id:number
    @Column()
    username:string
    @Column()
    email:string
    @Column({select:false})
    password:string
    @Column()
    role:string

}

