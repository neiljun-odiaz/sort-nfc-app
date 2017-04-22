export default function(Vue) {
    let vm = this
    Vue.auth = {
        getToken() {
            let user_token = '{"value":"vKmDAcEBfUTVeRgqgEnsam1aSM90MGIRGuRGKqfw","expiration":1492785358022}'
            
            /*chrome.storage.local.get('_token', function (result) {
                user_token = result._token;
                
                if (!user_token)
                    return null

                return user_token
            });*/

            return user_token
        },

        setToken(api_token) {
            let expiry = (new Date().getTime()) + (60000 * 60)
            let user_token = {value: api_token, expiration: expiry}
            chrome.storage.local.set({'_token': JSON.stringify(user_token)});
        },

        isAuthenticated() {
            /*let user_token = JSON.parse(this.getToken())
            console.log(user_token)
            // Check if token is set
            if (!user_token)
                return false

            let toke_expiry = user_token.expiration
            let timenow = new Date().getTime()
            // Check if token is expired
            if (toke_expiry < timenow)
                return false*/

            return true
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