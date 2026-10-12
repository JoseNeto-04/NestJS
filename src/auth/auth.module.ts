import { forwardRef, Module }  from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { FileService } from "src/file/file.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({

    imports: [
        JwtModule.register({
           secret:process.env.JWT_SECRET
        }),
        forwardRef(()=> UserModule),
        PrismaModule,

    ],
    controllers: [AuthController],
    providers: [AuthService, FileService],
    exports: [AuthService]
})

export class AuthModule {



}