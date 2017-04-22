<template>
    <div>
        <ul>
            <li>Device Name: {{ deviceinfo.device_name }}</li>
            <li>Vendor ID: {{ deviceinfo.vendor_id }}</li>
            <li>Product ID: {{ deviceinfo.product_id }}</li>
        </ul>
        <!-- <button type="button" @click.prevent="detectCard">Detect Card</button> -->
        <br>
        <br>
        <p><strong>Card Info</strong></p>
        <ul>
            <li>Card ID: {{ cardinfo.card_id }}</li>
            <li>User ID: {{ cardinfo.user_id }}</li>
            <li>Points: {{ cardinfo.points }}</li>
            <li>Last Date Updated: {{ parsedLatestUpdateDate }}</li>
            <li>Store ID: {{ cardinfo.store_id }}</li>
        </ul>
        <button type="button" @click.prevent="readCard">Read Card</button>
        <br>
        <br>
        <p><strong>Write Card</strong></p>
        <p>
            <label for="data">Points:</label>
            <input type="text" v-model="points">
        </p>
        <p>
            <label for="data">Amount:</label>
            <input type="text" v-model="amount">
        </p>
        <p>
            <label for="data">Name:</label>
            <input type="text" v-model="name">
        </p>
        <p>
            <label for="data">Store Name:</label>
            <input type="text" v-model="storename">
        </p>
        <button type="button" @click.prevent="writeCard">Write Card</button>
        <button type="button" @click.prevent="getAuth">Check Auth</button>
    </div>
</template>
<style>
    ul {
        margin: 0;
        padding: 0;
    }
    ul li {
        display: block;
        margin: 0;
        padding: 0;
    }
    p {
        margin: 0 0 10px;
        padding: 0;
    }
</style>
<script>
    export default {
        data() {
            return {
                name: '',
                points: 0,
                amount: 0,
                userid: 8888,
                storeid: 321,
                storename: '',
                expiry: 1218
            }
        },

        computed: {
            deviceinfo() {
                return this.$store.state.device_info;
            },

            cardinfo() {
                return this.$store.state.card_info;
            },

            parsedLatestUpdateDate() {
                let last_update = parseInt(this.$store.state.card_info.last_date_updated)
                let new_date = new Date(last_update)
                return new_date
            }
        },

        methods: {
            detectCard() {
                this.$nfc.enumerateDevices()
            },

            readCard() {
                this.$nfc.runTagChecker()
            },

            writeCard() {
                /**
                 * Format: {userid};{points};{amount};{timestamp};{storeid};{expiry}
                 */
                let datenow =  Date.now()
                let data = this.name + ';' + this.userid + ';' + this.points + ';' + this.amount + ';' + datenow + ';' + this.storeid  + ';' + this.storename + ';' + this.expiry
                console.log(data)
                this.$nfc.writeNdefTag('text', data)
            },

            getAuth() {
                console.log(this.$auth.isAuthenticated())
            }
        },

        created() {
            this.detectCard()
        }
    }
</script>