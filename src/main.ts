import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'normalize.css'
import './assets/main.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faArrowAltCircleLeft,
    faBoxArchive,
    faExternalLink,
    faGhost,
    faHandshake,
    faMagnifyingGlass,
    faShieldCat,
    faSplotch,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

library.add(
    faMagnifyingGlass,
    faArrowAltCircleLeft,
    faGithub,
    faGithubAlt,
    faBoxArchive,
    faSplotch,
    faShieldCat,
    faExternalLink,
    faEye,
    faEyeSlash,
    faGhost,
    faHandshake
)

app.mount('#app')

export { app }
