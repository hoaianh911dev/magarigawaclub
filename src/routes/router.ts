import { createRouter, createWebHistory } from 'vue-router'
import { PATH } from '../constants/path'
import { nextTick } from 'vue'

const Login = () => import('../pages/auth/Login.vue')

const routes = [
    {
        path: PATH.login.url,
        name: PATH.login.name,
        component: Login,
        meta: { title: PATH.login.title }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//load title page
const DEFAULT_TITLE = 'MAGARIGAWACLUB'
router.afterEach(to => {
    nextTick(() => {
        document.title = String(to.meta.title) || DEFAULT_TITLE;
    })
})

export default router