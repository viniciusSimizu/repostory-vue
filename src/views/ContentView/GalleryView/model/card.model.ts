import {
    IsBoolean,
    IsInt,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    ValidateNested,
} from 'class-validator'

class GithubAccount {
    @IsOptional()
    @IsString()
    name?: string

    @IsString()
    username: string

    @IsOptional()
    @IsUrl()
    avatarUrl?: string
}

export class CardModel {
    @IsOptional()
    @IsUUID()
    id?: string

    @IsOptional()
    @IsInt()
    apiId?: number

    @IsString()
    repoName: string

    @IsUrl()
    url: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsBoolean()
    alreadyAdded?: boolean

    @ValidateNested()
    githubAccount: GithubAccount
}
