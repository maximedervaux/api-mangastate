import { IsDate, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1) //TODO : add a minimum length for the password
    readonly password: string;

    @IsDate()
    readonly birthday: Date;

}