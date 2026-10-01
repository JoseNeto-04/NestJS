import { IsString, IsEmail, IsStrongPassword, IsOptional, IsDateString} from 'class-validator';

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
}