import { IsEmail, IsOptional, IsString, Length } from 'class-validator'

export class UpdateUserModel {
    @IsOptional()
    @IsString()
    @Length(4, 20)
    name?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsString()
    password?: string = ''
}
