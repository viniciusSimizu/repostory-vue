import { createRouter, createWebHistory } from 'vue-router'

import ContentView from '../views/ContentView/ContentView.vue'
import HomePageView from '../views/ContentView/HomepageView/HomepageView.vue'
import GalleryView from '../views/ContentView/GalleryView/GalleryView.vue'
import ProfileView from '../views/ContentView/ProfileView/ProfileView.vue'
import UsersProfileView from '../views/ContentView/UsersProfile/UsersProfileView.vue'
import JoinView from '../views/JoinView/JoinView.vue'
import SignUpView from '../views/JoinView/SignupView/SignupView.vue'
import LoginView from '../views/JoinView/LoginView/LoginView.vue'

import GithubOAuthService from '../services/GithubOAuthService.vue'
import { authMiddleware } from '@/middleware/auth.middleware'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'content-route',
            beforeEnter: [authMiddleware],
            component: ContentView,
            children: [
                {
                    path: '',
                    name: 'homepage-route',
                    component: HomePageView,
                },
                {
                    path: 'gallery',
                    name: 'gallery-route',
                    component: GalleryView,
                },
                {
                    path: 'profile',
                    name: 'profile-route',
                    component: ProfileView,
                },
                {
                    path: 'profile/:slug',
                    name: 'users-profile-route',
                    props: true,
                    component: UsersProfileView,
                },
            ],
        },
        {
            path: '/join',
            component: JoinView,
            children: [
                {
                    path: 'signup',
                    name: 'signup-route',
                    component: SignUpView,
                },
                {
                    path: 'login',
                    name: 'login-route',
                    component: LoginView,
                },
            ],
        },
        {
            path: '/github/oauth',
            name: 'github-service-route',
            beforeEnter: [authMiddleware],
            component: GithubOAuthService,
        },
    ],
})

export default router
