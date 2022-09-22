export class UserStoreModel {
    name: string
    email: string

    githubAccount?: {
        username: string
        avatarUrl?: string
        urlAccount: string

        _count: {
            repositories: number
            gitRepositories: number
        }
    }
}
