import { BadRequestException, Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UseGuards, UseInterceptors, } from "@nestjs/common";
import { UploadedFile, UploadedFiles } from "@nestjs/common/decorators";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/decorators/user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { join } from "path";
import { FileService } from "src/file/file.service";
import { FilesInterceptor } from "@nestjs/platform-express";




@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService,
    ) {}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO) {

        return this.authService.login(email, password)

    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {

        return this.authService.register(body)

    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {

        return this.authService.forget(email)

    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO) {

        return this.authService.reset(password, token)

    }
    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {
   
         return {user}
    }
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user,
        @UploadedFile(new ParseFilePipe({

            validators: [
                new FileTypeValidator({fileType:'image/jpeg'}),
                new MaxFileSizeValidator({maxSize: 1024 * 10})

            ]

        })) photo: Express.Multer.File) {

        const path = join(
                __dirname,
                '..',
                '..',
                'storage',
                'photos',
                `photo-${user.id}.jpg`
                )
        
        try{

        this.fileService.upload(photo, path )

        }catch(e){

            throw new BadRequestException(e)

        }
        return {sucess: true}
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]) {

        return files
        
    }

      @UseInterceptors(FileFieldsInterceptor([{
        name: 'photo',
        maxCount: 1
    },{
        name: 'documents',
        maxCount: 10
    }])
)

    @UseGuards(AuthGuard)
    @Post('files-fields')
    async uploadFilesFields(@User() user, @UploadedFiles() files: {photo: Express.Multer.File, documents: Express.Multer.File[]}) {

        return {files}

    }
}