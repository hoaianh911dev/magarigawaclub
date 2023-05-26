import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

import { PATH } from '../constants/path'
import { DEFAULT_TITLE } from '../constants/default'

const Login = () => import('../pages/auth/Login.vue')
const NotFound = () => import('../pages/not found/NotFound.vue')
const HomeTop = () => import('../pages/home/HomeTop.vue')
const ResetPassword = () => import("../pages/auth/ResetPassword.vue")
const SendMail = () => import("../pages/auth/SendMail.vue")
const BookingConfirm = () => import("../pages/calendar/BookingConfirm.vue")
const UnAuthorization = () => import("../pages/unauthorization/UnAuthorization.vue")
const TripBook = () => import("../pages/calendar/TripBook.vue")
const TripConfirm = () => import("../pages/calendar/TripConfirm.vue")
const TripHistory = () => import("../pages/calendar/TripHistory.vue")
const StayBook = () => import("../pages/calendar/StayBook.vue")
const StayConfirm = () => import("../pages/calendar/StayConfirm.vue")
const StayHistory = () => import("../pages/calendar/StayHistory.vue")
const FacilityBook = () => import("../pages/calendar/FacilityBook.vue")
const FacilityConfirm = () => import("../pages/calendar/FacilityConfirm.vue")
const FacilityHistory = () => import("../pages/calendar/FacilityHistory.vue")
const MyPage = () => import("../pages/member/MyPage.vue")

const routes = [
    {
        path: PATH.login.url,
        name: PATH.login.name,
        component: Login,
        meta: { title: PATH.login.title }
    },
    {
        path: PATH.resetPassword.url,
        name: PATH.resetPassword.name,
        component: ResetPassword,
        meta: { title: PATH.resetPassword.title },
        
    },
    {
        path: PATH.sendMail.url,
        name: PATH.sendMail.name,
        component: SendMail,
        meta: { title: PATH.sendMail.title },
        
    },
    {
        path: PATH.home.url,
        name: PATH.home.name,
        component: HomeTop,
        meta: { title: PATH.home.title, footerActiveIndex: 1, isAuthencation: true },
        
    },
    {
        path: PATH.bookingConfirm.url,
        name: PATH.bookingConfirm.name,
        component: BookingConfirm,
        meta: { title: PATH.bookingConfirm.title, footerActiveIndex: 2, isAuthencation: true },
        
    },
    {
        path: PATH.tripBook.url,
        name: PATH.tripBook.name,
        component: TripBook,
        meta: { title: PATH.tripBook.title, footerActiveIndex: 2, isAuthencation: true }
    },
    {
        path: PATH.tripConfirm.url, 
        name: PATH.tripConfirm.name,
        component: TripConfirm,
        meta: { title: PATH.tripConfirm.title, footerActiveIndex: 2, isAuthencation: true }
    },
    {
        path: PATH.tripHistory.url, 
        name: PATH.tripHistory.name,
        component: TripHistory,
        meta: { title: PATH.tripHistory.title, footerActiveIndex: 2, isAuthencation: true }
    },
    {
        path: PATH.stayBook.url,
        name: PATH.stayBook.name,
        component: StayBook,
        meta: { title: PATH.stayBook.title, footerActiveIndex: 2, isAuthencation: true }
    },
    {
        path: PATH.stayConfirm.url,
        name: PATH.stayConfirm.name,
        component: StayConfirm,
        meta: { title: PATH.stayConfirm.title, footerActiveIndex: 2, isAuthencation: true }
    },
    {
        path: PATH.stayHistory.url,
        name: PATH.stayHistory.name,
        component: StayHistory,
        meta: { title: PATH.stayHistory.title, footerActiveIndex: 2, isAuthencation: true }
    },
    {
        path: PATH.facilityBook.url,
        name: PATH.facilityBook.name,
        component: FacilityBook,
        meta: { title: PATH.facilityBook.title, footerActiveIndex: 2, isAuthencation: true }
    },
    {
        path: PATH.facilityConfirm.url,
        name: PATH.facilityConfirm.name,
        component: FacilityConfirm,
        meta: { title: PATH.facilityConfirm.title, footerActiveIndex: 2, isAuthencation: true }
    },
    {
        path: PATH.facilityHistory.url,
        name: PATH.facilityHistory.name,
        component: FacilityHistory,
        meta: { title: PATH.facilityHistory.title, footerActiveIndex: 2, isAuthencation: true }
    },
    {
        path: PATH.myPage.url,
        name: PATH.myPage.name,
        component: MyPage,
        meta: { title: PATH.myPage.title, footerActiveIndex: 5, isAuthencation: true }
    },
    {
        path: PATH.unauthorization.url,
        name: PATH.unauthorization.name,
        component: UnAuthorization,
        meta: { title: PATH.unauthorization.title }
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

router.beforeEach((to, from, next) => {
    const isAuthencation = to.meta.isAuthencation
    if(isAuthencation) {
        const isUserLogined = JSON.parse(localStorage.getItem('user'))
        if (!isUserLogined) {
            next({ name: PATH.unauthorization.name })
        } 
    }
    next()
})

export default router