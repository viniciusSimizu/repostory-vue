import { IsString } from 'class-validator'

export class LoginUserModel {
    @IsString()
    username: string

    @IsString()
    password: string
}
