import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
//const
import { PATH } from '../constants/path'
import { DEFAULT_TITLE } from '../constants/default'
//hooks
import useLocalStorage from '../hooks/useLocalStorage'

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
const MembershipCard = () => import("../pages/member/MembershipCard.vue")
const MembershipInfo = () => import("../pages/member/MembershipInfo.vue")
const MembershipConfim = () => import("../pages/member/MembershipConfirm.vue")
const Friends = () => import("../pages/member/Friends.vue")
const GuestList = () => import("../pages/member/GuestList.vue")
const GuestEdit = () => import("../pages/member/GuestEdit.vue")
const VehicleInfo = () => import("../pages/member/VehicleInfo.vue")
const VehicleEdit = () => import("../pages/member/VehicleEdit.vue")
const ContactUs = () => import('../pages/member/ContactUs.vue')
const PrivacyPolicy = () => import('../pages/member/PrivacyPolicy.vue')
const TermsOfService = () => import('../pages/member/TermsOfService.vue')
const Notice = () => import('../pages/notice/Notice.vue')
const NoticeDetail = () => import('../pages/notice/NoticeDetail.vue')
const EventDetail = () => import('../pages/notice/EventDetail.vue')
const CheckIn = () => import('../pages/checkin/CheckIn.vue')

const routes = [
    {
        path: PATH.login.url,
        name: PATH.login.name,
        component: Login,
        meta: { title: PATH.login.title }
    },
    {
        path: PATH.resetPassword.url + "/:id",
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
        path: PATH.membershipCard.url,
        name: PATH.membershipCard.name,
        component: MembershipCard,
        meta: { title: PATH.membershipCard.title, footerActiveIndex: 5, isAuthencation: true }
    },
    {
        path: PATH.membershipInfo.url,
        name: PATH.membershipInfo.name,
        component: MembershipInfo,
        meta: { title: PATH.membershipInfo.title, footerActiveIndex: 5, isAuthencation: true }
    },
    {
        path: PATH.membershipConfirm.url,
        name: PATH.membershipConfirm.name,
        component: MembershipConfim,
        meta: { title: PATH.membershipConfirm.title, footerActiveIndex: 5, isAuthencation: true }
    },
    {
        path: PATH.friend.url,
        name: PATH.friend.name,
        component: Friends,
        meta: { title: PATH.friend.title, footerActiveIndex: 5, isAuthencation: true }
    },
    {
        path: PATH.guestList.url,
        name: PATH.guestList.name,
        component: GuestList,
        meta: { title: PATH.guestList.title, footerActiveIndex: 5, isAuthencation: true }
    },
    {
        path: PATH.guestEdit.url + "/:id?",
        name: PATH.guestEdit.name,
        component: GuestEdit,
        meta: { title: PATH.guestEdit.title, footerActiveIndex: 5, isAuthencation: true }
    },
    {
        path: PATH.vehicleInfo.url,
        name: PATH.vehicleInfo.name,
        component: VehicleInfo,
        meta: { title: PATH.vehicleInfo.title, footerActiveIndex: 5, isAuthencation: true}
    },
    {
        path: PATH.vehicleEdit.url + "/:id?",
        name: PATH.vehicleEdit.name,
        component: VehicleEdit,
        meta: { title: PATH.vehicleEdit.title, footerActiveIndex: 5, isAuthencation: true }
    },
    {
        path: PATH.contactUs.url,
        name: PATH.contactUs.name,
        component: ContactUs,
        meta: { title: PATH.contactUs.title, footerActiveIndex: 5, isAuthencation: true }
    },
    {
        path: PATH.privacyPolicy.url,
        name: PATH.privacyPolicy.name,
        component: PrivacyPolicy,
        meta: { title: PATH.privacyPolicy.title, footerActiveIndex: 5, isAuthencation: true }
    },
    {
        path: PATH.termsOfService.url,
        name: PATH.termsOfService.name,
        component: TermsOfService,
        meta: { title: PATH.termsOfService.title, footerActiveIndex: 5, isAuthencation: true }
    },
    {
        path: PATH.notice.url,
        name: PATH.notice.name,
        component: Notice,
        meta: { title: PATH.notice.title, footerActiveIndex: 4, isAuthencation: true }
    },
    {
        path: PATH.noticeDetail.url + "/:id",
        name: PATH.noticeDetail.name,
        component: NoticeDetail,
        meta: { title: PATH.noticeDetail.title, footerActiveIndex: 4, isAuthencation: true }
    },
    {
        path: PATH.eventDetail.url + "/:id",
        name: PATH.eventDetail.name,
        component: EventDetail,
        meta: { title: PATH.eventDetail.title, footerActiveIndex: 4, isAuthencation: true }
    },
    {
        path: PATH.checkIn.url,
        name: PATH.checkIn.name,
        component: CheckIn,
        meta: { title: PATH.checkIn.title, footerActiveIndex: 5, isAuthencation: true }
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
        const isUserLogined = useLocalStorage().user
        if (!isUserLogined) {
            next({ name: PATH.unauthorization.name })
        } 
    }
    next()
})

export default router