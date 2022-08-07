import * as bcrypt from "bcryptjs";
import {AuthRole} from "./auth.role";
import {AuthDto} from "./dto/auth.dto";

export class UserFactory {
    private readonly _username: string
    private readonly _email: string
    private _password: string
    private readonly _role: AuthRole

    constructor(bodyAuth: AuthDto) {
        this._username = bodyAuth.username
        this._email = bodyAuth.email
        this._password = bodyAuth.password
        this._role = AuthRole.COMMON

    }
    
    public get role() {
        return this._role
    }

    public get password() {
        return this._password
    }

    public get username() {
        return this._username
    }

    public get email() {
        return this._email
    }

    public async hashPassword() {

        const salt = bcrypt.genSaltSync(5)
        this._password = await bcrypt.hashSync(this._password, salt);
    }
}