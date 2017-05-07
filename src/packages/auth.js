import {store} from '../store.js'

export default function(Vue) {
    let vm = this
    Vue.auth = {
        getToken() {
            let user_token = ''

            return new Promise((resolve, reject) => {
                chrome.storage.sync.get('_token', function (result) {
                    console.log(result.length)
                    if (!result) {
                        reject();
                    } else {
                        user_token = result._token;
                        resolve(user_token);
                    }
                });
            })

        },

        setToken(api_token) {
            let expiry = (new Date().getTime()) + (60000 * 60)
            let user_token = {value: api_token, expiration: expiry}

            return new Promise((resolve, reject) => {
                chrome.storage.sync.set({'_token': JSON.stringify(user_token)}, function(e){
                    console.log( JSON.stringify(user_token) )
                    resolve(user_token);
                });
            });
        },

        removeToken() {
            let logout = true
            return new Promise((resolve, reject) => {
                chrome.storage.sync.remove('_token', function(e){
                    console.log('Logged out!');
                    resolve(logout);
                });
            });
        },

        isAuthenticated() {
            let user_token = ''

            return new Promise((resolve, reject) => {
                chrome.storage.sync.get('_token', function (result) {
                    let len = Object.keys(result).length
                    if (!len) {
                        console.log('No token')
                        store.state.isAuth = false
                        reject(false);
                    } else {
                        user_token = result._token;
                        if (user_token) {
                            let toke_expiry = result.expiration
                            let timenow = new Date().getTime()

                            if (toke_expiry < timenow)
                                reject(false);

                            store.state.isAuth = true
                            resolve(user_token);
                        } else {
                            reject(false);
                        }
                    }
                });
            });
        }
    }

    Object.defineProperties(Vue.prototype, {
        $auth: {
            get () {
                return Vue.auth
            }
        }
    })
}