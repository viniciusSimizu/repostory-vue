import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserModel {
    @IsString()
    @Length(4, 20)
    name: string

    @IsEmail()
    email: string

    @IsString()
    password: string
}
