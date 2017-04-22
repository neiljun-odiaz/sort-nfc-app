import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import {store} from './store.js'

import Home from './components/pages/Home.vue'
import Login from './components/pages/Login.vue'
import CardPreReg from './components/pages/CardPreReg.vue'
import Stores from './components/pages/Stores.vue'

import NFCApp from './packages/nfcapp.js'
import Auth from './packages/auth.js'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

Vue.use(NFCApp)
Vue.use(Auth)

axios.defaults.baseURL = 'http://localhost:9010'

if (Vue.auth.isAuthenticated()) {
    let auth_token = JSON.parse(Vue.auth.getToken())
    axios.defaults.headers.common['Authorization'] = auth_token.value
}

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                forAuth: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                forVisitor: true
            }
        },
        {
            path: '/stores',
            component: Stores,
            meta: {
                forAuth: true
            }
        },
        {
            path: '/card-pre-reg',
            component: CardPreReg,
            meta: {
                forAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitor)) {
        if (Vue.auth.isAuthenticated()) {
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.forAuth)) {
        if (!Vue.auth.isAuthenticated()) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
