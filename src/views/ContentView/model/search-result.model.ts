import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator'

export class SearchResultModel {
    @IsString()
    name: string

    @IsString()
    slug: string

    @IsOptional()
    @IsUrl()
    avatarUrl?: string

    @IsOptional()
    @IsString()
    username?: string

    @IsOptional()
    @IsInt()
    repositories?: string
}
