<script>
import { UserInfoModel } from '@/views/ContentView/HomepageView/model/user-info.model'

export default {
    props: {
        isGithubUser: Boolean,
        userInfo: UserInfoModel,
    },
}
</script>

<template>
    <div class="d-flex justify-content-center align-items-center">
        <div v-if="isGithubUser">
            <ul id="circle-pad" class="m-0">
                <li>
                    <div>
                        <h6 class="gitpad-title">Repostory repos</h6>
                        <font-awesome-icon icon="fa-solid fa-box-archive" />
                        <p class="gitpad-info">{{ userInfo.repositories }}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <h6 class="gitpad-title">Github repos</h6>
                        <font-awesome-icon icon="fa-brands fa-github-alt" />
                        <p class="gitpad-info">
                            {{ userInfo.gitRepositories }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div
            v-else
            class="d-flex flex-column align-items-center justify-content-center gap-3"
        >
            <h1 class="display-3">Welcome to Repostory</h1>
            <p class="h1" style="padding: 0 10rem; text-align: center">
                Connect to Github to see your repositories status
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
$items: 2;

#circle-pad {
    width: 30rem;
    height: 30rem;

    position: relative;

    border: 1px solid #ccc;
    border-radius: 50%;

    background-color: #131b2c;

    font-size: 1rem;

    transform: rotate(90deg);

    .gitpad-title {
        font-size: 1.4rem;
        font-weight: 500;
    }

    .gitpad-info {
        font-size: 2rem;
        font-weight: 400;

        margin: 0;
    }

    @for $i from 1 through $items {
        li:nth-child(#{$items - $i + 1}) {
            width: 9rem;

            text-align: center;

            list-style: none;

            position: absolute;
            top: 10.6rem;
            left: 11.5rem;

            transition: 0.5s;

            transform: rotate(calc(360deg / $items * $i)) translateX(-140px);

            div {
                font-size: 2.2rem;

                display: flex;
                flex-direction: column;
                justify-content: center;

                transform: rotate(-(calc(360deg / $items * $i + 90deg)));
            }
        }
    }
}
</style>
