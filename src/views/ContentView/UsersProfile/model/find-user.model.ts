export class FindUserModel {
    name: string
    githubAccount?: {
        id: string
        username: string
        avatarUrl?: string
        urlAccount: string
        repositories?: {
            repoName: string
            description: string
            url: string
        }[]
    }
}
