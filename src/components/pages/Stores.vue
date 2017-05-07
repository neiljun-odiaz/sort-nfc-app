<template>
    <div>
        <div class="columns">
            <div class="column is-one-third">
                <form action="" class="generic-form">
                    <div class="field">
                        <label class="label">Store key</label>
                        <p class="control">
                            <input class="input" type="text" v-model="store.key" maxlength="4">
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
            </div>
            <div class="column is-two-thirds">
                <div class="List">
                    <table class="table is-striped is-bordered is-narrow">
                        <thead>
                            <tr>
                                <th>Store Key</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(store, index) in stores">
                                <td>{{ store.key }}</td>
                                <td>{{ store.name }}</td>
                                <td>{{ store.address }}</td>
                                <td class="List__item--action">
                                    <button class="button is-info is-small" @click.prevent="showUpdateModal(store, index)"><i class="fa fa-edit"></i></button>
                                    <button class="button is-danger is-small" @click.prevent="showDeleteModal(store, index)"><i class="fa fa-trash-o"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal" :class="{'is-active': isUpdating}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <h1 class="title is-4">Updating Store</h1>
                    <form action="">
                        <div class="field">
                            <label class="label">Store key</label>
                            <p class="control">
                                <input class="input" type="text" v-model="temp_store.key" maxlength="4">
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Store Name</label>
                            <p class="control">
                                <input class="input" type="text" v-model="temp_store.name">
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Address</label>
                            <p class="control">
                                <input class="input" type="text" v-model="temp_store.address">
                            </p>
                        </div>
                        <div class="field">
                            <p class="control">
                                <button class="button is-primary" @click.prevent="updateStore">Update Store</button>
                                <button class="button" @click.prevent="closeModal">Close</button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <button class="modal-close" @click.prevent="closeModal"></button>
        </div>

        <div class="modal" :class="{'is-active': isDeleting}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <h1 class="title is-4">Delete Store?</h1>
                    <p>Do you want to delete <strong>{{ temp_store.name }}</strong>?</p>
                    <div class="field">
                        <p class="control">
                            <button class="button is-danger" @click.prevent="deleteStore">Delete</button>
                            <button class="button" @click.prevent="closeModal">Close</button>
                        </p>
                    </div>
                </div>
            </div>
            <button class="modal-close" @click.prevent="closeModal"></button>
        </div>
    </div>
</template>
<style>
    .List {
        padding: 0 2em;
    }
    .List__item--action .fa{
        font-size: 16px;
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
                isUpdating: false,
                isDeleting: false,
                store_index: '',
                temp_store: {}
            }
        },

        computed: {
           
        },

        methods: {
            showUpdateModal(store, index) {
                this.isUpdating = true
                this.temp_store = store
                this.store_index = index
            },

            showDeleteModal(store, index) {
                this.isDeleting = true
                this.temp_store = store
                this.store_index = index
            },

            closeModal() {
                this.isUpdating = false
                this.isDeleting = false
                this.store = {
                    key: '',
                    name: '',
                    address: ''
                }
                this.temp_store = {}
                this.store_index = ''
                this.generateKey()
            },

            addStore() {
                let store_info = this.store
                this.$http.post('store', store_info).then((response) => {
                    if (response.status == 200) {
                        let response_body = response.data
                        if (response_body.result){
                            this.stores.push(store_info)
                            this.store = {
                                key: '',
                                name: '',
                                address: ''
                            }
                            this.generateKey()
                        } else {
                            alert(response_body.message)
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },

            updateStore() {
                let store_info = this.store
                let index = this.store_index
                this.$http.post('store/update', store_info).then((response) => {
                    if (response.status == 200) {
                        let response_body = response.data
                        if (response_body.result){
                            this.stores[index] = store_info
                            this.closeModal()
                        } else {
                            alert(response_body.message)
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },

            deleteStore() {
                let store_info = this.temp_store
                let index = this.store_index
                this.$http.post('store/delete', store_info).then((response) => {
                    if (response.status == 200) {
                        let response_body = response.data
                        if (response_body.result){
                            this.stores.splice(index, 1)
                            this.closeModal()
                        } else {
                            alert(response_body.message)
                        }
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
            this.$http.get('store').then((response) => {
                if (response.status) {
                    this.stores = response.data
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
</script>