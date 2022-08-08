import {forwardRef, Module} from "@nestjs/common";
import {MailService} from "./mail.service";
import {AuthModule} from "../authorizhation/auth.module";

@Module({
    imports: [forwardRef(()=>AuthModule)],
    providers: [MailService],
    exports:[MailService]
})
export class MailModule {
}