<template>
    <div class="columns">
        <div class="column is-one-third">
            <div class="notification" :class="[reg_result ? 'is-success' : 'is-danger']" v-show="show_notif">
                {{ reg_message }}
            </div>
            <form action="" class="generic-form">
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
                            <select v-model="store_id" required>
                                <option value=""> Select a Store </option>
                                <option v-for="store in stores" :value="store.id">{{store.name}}</option>
                            </select>
                        </span>
                    </p>
                </div>
                <div class="field auto-save-field">
                    <input type="checkbox" class="checkbox" id="autosave" v-model="autosave" /><label for="autosave"><strong>Auto Save</strong></label>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary" @click.prevent="saveCard">Pre-Register Card</button>
                    </p>
                </div>
            </form>
        </div>
        <div class="column is-two-thirds">
            <div class="List">
                <table class="table is-striped is-bordered">
                    <thead>
                        <tr>
                            <th>Card UID</th>
                            <th>Store</th>
                            <th>Batch Key</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(card, index) in cards">
                            <td>{{ card.uid }}</td>
                            <td>{{ card.store.name }}</td>
                            <td>{{ card.batch_key }}</td>
                            <td class="List__item--action">
                                <button class="button is-info is-small" @click.prevent="showUpdateModal(card, index)"><i class="fa fa-edit"></i></button>
                                <button class="button is-danger is-small" @click.prevent="showDeleteModal(card, index)"><i class="fa fa-trash-o"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style>
    .auto-save-field {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .auto-save-field .checkbox {
        margin-right: 7px;
    }
    .auto-save-field label {
        cursor: pointer;
    }
</style>
<script>
    export default {
        data() {
            return {
                store_id: '',
                batch_key: '',
                stores: [],
                cards: [],
                show_notif: false,
                reg_message: '',
                reg_result: '',
                autosave: false,
                tmp_tag_id: '0000000'
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
                    uid: vm.cardinfo.card_id,
                    batch_key: vm.batch_key,
                    store_id: vm.store_id,
                }
                if (!vm.store_id) {
                    console.log('Please select Store')
                    return false
                }
                vm.$http.post('card', card_info).then((response) => {
                    if (response.status == 200) {
                        if (response.data.result){
                            vm.cards.push(response.data.card)
                            vm.reg_result = true
                        } else {
                            vm.reg_result = false
                        }
                        vm.reg_message = response.data.message
                        vm.show_notif = true
                    }
                }).catch(function (error) {
                    console.log(error);
                    vm.reg_result = false
                    vm.reg_message = error
                    vm.show_notif = true
                });
            }
        },

        watch: {
            cardinfo() {
                let tag_id = this.$store.state.card_info.card_id
                if (tag_id !== "" && this.tmp_tag_id !== tag_id){
                    this.tmp_tag_id = tag_id
                    if (this.autosave) {
                        // Perform Auto Save
                        this.saveCard()
                    }
                }

            }
        },

        created() {
            this.detectCard()
            this.batch_key = this.getBatchKey

            this.$http.get('store').then((response) => {
                if (response.status) {
                    this.stores = response.data
                }
            }).catch(function (error) {
                console.log(error);
            });

            this.$http.get('card').then((response) => {
                if (response.status) {
                    this.cards = response.data
                }
            }).catch(function (error) {
                console.log(error);
            });
        },

        destroyed() {
            this.$nfc.destroyCheck()
        }
    }
</script>