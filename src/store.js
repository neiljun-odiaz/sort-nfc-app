import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        device_info: {
            device_name: '',
            vendor_id: '',
            product_id: ''
        },

        isAuth: false,

        // {points};{amount};{timestamp};{storeid};{expiry}
        card_info: {
            tag_id: '',
            points: '',
            amount: '',
            last_updated: '',
            store_id: '',
            expiry: ''
        }
    }
})