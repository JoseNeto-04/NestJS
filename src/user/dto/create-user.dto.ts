import { IsString, IsEmail, IsStrongPassword, IsOptional, IsDateString, IsEnum} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDTO  {

    @IsString()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minSymbols: 1
    })
    password: string;


    @IsOptional()
    @IsDateString()
    birthAt?: string;

    @IsOptional()
    @IsEnum(Role)
    role: number

}