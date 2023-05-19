import { createI18n } from 'vue-i18n'
import viMessage from '../lang/vi.json'
import enMessage from '../lang/en.json'

const DEFAUT_LANGUAGE = 'vi'

const messages = {
    vi: viMessage,
    en: enMessage
}

const i18n = createI18n({
    locale: localStorage.getItem('language') || DEFAUT_LANGUAGE,
    fallbackLocale: DEFAUT_LANGUAGE,
    messages,
    globalInjection: true,
    legacy: false
})

export default i18n