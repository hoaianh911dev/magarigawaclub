import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

import { PATH } from '../constants/path'
import { DEFAULT_TITLE } from '../constants/default'

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
router.afterEach(to => {
    nextTick(() => {
        document.title = String(to.meta.title) || DEFAULT_TITLE;
    })
})

router.beforeEach((to, from, next) => {
    
    const checkPageExist = routes.findIndex(r => r.name === to.name)
    if(checkPageExist === -1) {
        next({name: PATH.login.name})
    }
})

export default router