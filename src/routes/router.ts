import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

import { PATH } from '../constants/path'
import { DEFAULT_TITLE } from '../constants/default'

const Login = () => import('../pages/auth/Login.vue')
const NotFound = () => import('../pages/not found/NotFound.vue')
const HomeTop = () => import('../pages/home/HomeTop.vue')

const routes = [
    {
        path: PATH.login.url,
        name: PATH.login.name,
        component: Login,
        meta: { title: PATH.login.title }
    },
    {
        path: PATH.home.url,
        name: PATH.home.name,
        component: HomeTop,
        meta: { title: PATH.home.title, footerActiveIndex: 1 },
        
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//load title page
router.afterEach(to => {
    nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    })
})

export default router