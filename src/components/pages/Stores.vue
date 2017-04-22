<template>
    <div class="columns">
        <div class="column is-4 is-offset-4">
            <h2><a href="" @click.prevent="$router.push('/')">Home</a></h2>
            <form action="" class="login-form">
                <div class="field">
                    <label class="label">Store key</label>
                    <p class="control">
                        <input class="input" type="text" v-model="store.key">
                    </p>
                </div>
                <div class="field">
                    <label class="label">Store Name</label>
                    <p class="control">
                        <input class="input" type="text" v-model="store.name">
                    </p>
                </div>
                <div class="field">
                    <label class="label">Address</label>
                    <p class="control">
                        <input class="input" type="text" v-model="store.address">
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary" @click.prevent="addStore">Add Store</button>
                    </p>
                </div>
            </form>
            <h2>Stores:</h2>
            <ul>
                <li v-for="store in stores">
                    {{ store.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
    h2 {
        font-weight: bold;
    }
</style>
<script>
    export default {
        data() {
            return {
                stores: [],
                store: {
                    key: '',
                    name: '',
                    address: ''
                },
            }
        },

        computed: {
           
        },

        methods: {
            addStore() {
                let store_info = this.store
                this.$http.post('api/store', store_info).then((response) => {
                    if (status.status == 200) {
                        this.stores.push(store_info)
                        this.store = {
                            key: '',
                            name: '',
                            address: ''
                        }
                        this.generateKey()
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },

            generateKey() {
                let text = "";
                let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                for( var i=0; i < 4; i++ ) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                
                this.store.key = text
            }
        },

        created() {
            this.generateKey()
            this.$http.get('api/store').then((response) => {
                if (response.status) {
                    this.stores = response.data
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
</script>