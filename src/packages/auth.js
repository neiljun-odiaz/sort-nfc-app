export default function(Vue) {
    let vm = this
    Vue.auth = {
        getToken() {
            // let user_token = '{"value":"vKmDAcEBfUTVeRgqgEnsam1aSM90MGIRGuRGKqfw","expiration":1492785358022}'
            let user_token = ''

            // Development
            // user_token = localStorage.getItem('_token')
            // if (!user_token)
            //     return null
            //
            // return user_token

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
                    console.log(e)
                    resolve(user_token);
                });
            });

            // Development
            // localStorage.setItem('_token', JSON.stringify(user_token))
        },

        isAuthenticated() {
            let user_token = ''
            /*
            // Check if token is set
            if (!user_token)
                return false

            let toke_expiry = user_token.expiration
            let timenow = new Date().getTime()

            // Check if token is expired
            if (toke_expiry < timenow)
                return false*/

            return new Promise((resolve, reject) => {
                chrome.storage.sync.get('_token', function (result) {
                    let len = Object.keys(result).length
                    if (!len) {
                        console.log('No token')
                        reject(false);
                    } else {
                        user_token = result._token;
                        if (user_token) {
                            let toke_expiry = result.expiration
                            let timenow = new Date().getTime()

                            if (toke_expiry < timenow)
                                reject(false);

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