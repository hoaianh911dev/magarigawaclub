import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import i18n from './configs/i18n'
import FontAwesomeIcon from './configs/fontawesome'

//import css
import './assets/css/tailwind-config.css'
import 'element-plus/dist/index.css'
import './assets/scss/Style.scss'

// Config App
const app = createApp(App)

app.use(router)
app.use(i18n)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
