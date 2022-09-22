import { IsInt } from 'class-validator'

export class UserInfoModel {
    @IsInt()
    repositories: number

    @IsInt()
    gitRepositories: number
}
