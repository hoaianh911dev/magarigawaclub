import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import i18n from './configs/i18n'
import FontAwesomeIcon from './configs/fontawesome'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import VueSweetalert2 from 'vue-sweetalert2'
import { VueQueryPlugin } from "vue-query"

//import css
import 'sweetalert2/dist/sweetalert2.min.css'
import './assets/css/tailwind-config.css'
import 'element-plus/dist/index.css'
import './assets/scss/Style.scss'

// Config App
const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(VueSweetalert2)
app.use(VueQueryPlugin)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component(VueQrcode.name, VueQrcode)

app.mount('#app')
