<template>
    <div class="columns">
        <div class="column is-4 is-offset-4">
            <h2><a href="" @click.prevent="$router.push('/')">Home</a></h2>
            <form action="" class="login-form">
                <div class="field">
                    <label class="label">Card ID</label>
                    <p class="control">
                        <input class="input" type="text" v-model="cardinfo.card_id">
                    </p>
                </div>
                <div class="field">
                    <label class="label">Batch ID</label>
                    <p class="control">
                        <input class="input" type="text" v-model="batch_key">
                    </p>
                </div>
                <div class="field">
                    <label class="label">Store</label>
                    <p class="control">
                        <span class="select">
                            <select v-model="store_id">
                                <option value=""> Select a Store </option>
                                <option v-for="store in stores" :value="store.id">{{store.name}}</option>
                            </select>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary" @click.prevent="saveCard">Pre-Register Card</button>
                    </p>
                </div>
            </form>
            <h2><strong>Card List</strong></h2>
            <ul>
                <li v-for="card in cards">{{card.uid}}</li>
            </ul>
        </div>
    </div>
</template>
<style>
    
</style>
<script>
    export default {
        data() {
            return {
                store_id: '',
                batch_key: '',
                stores: [],
                cards: []
            }
        },

        computed: {
            cardinfo() {
                return this.$store.state.card_info;
            },

            deviceinfo() {
                return this.$store.state.device_info;
            },

            getBatchKey() {
                let month = new Date().getMonth() + 1
                let zeroed_month = ('0' + month).slice(-2)
                let year = new Date().getFullYear()
                return zeroed_month + '' + year
            }
        },

        methods: {
            detectCard() {
                this.$nfc.enumerateDevices()
                this.readCard()
            },

            readCard() {
                this.$nfc.runTagChecker()
            },

            saveCard() {
                let vm = this
                let card_info = {
                    uid: this.cardinfo.card_id,
                    batch_key: this.batch_key,
                    store_id: this.store_id,
                }
                vm.$http.post('api/card', card_info).then((response) => {
                    if (status.status == 200) {
                        vm.cards.push({
                            uid: vm.cardinfo.card_id,
                            batch_key: vm.cardinfo.batch_key,
                            store_id: vm.cardinfo.store_id,
                        })
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },

        created() {
            this.detectCard()
            this.batch_key = this.getBatchKey

            this.$http.get('api/store').then((response) => {
                if (response.status) {
                    this.stores = response.data
                }
            }).catch(function (error) {
                console.log(error);
            });

            this.$http.get('api/card').then((response) => {
                if (response.status) {
                    this.cards = response.data
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
</script>