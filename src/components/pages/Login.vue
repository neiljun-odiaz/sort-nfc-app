<template>
    <div class="columns">
        <div class="column is-4 is-offset-4">
            <form action="" class="login-form">
                <div class="field">
                    <label class="label">Username</label>
                    <p class="control">
                        <input class="input" type="text" v-model="username">
                    </p>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <p class="control">
                        <input class="input" type="password" v-model="password">
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary" @click.prevent="login">Login</button>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                // TODO: Remove on production
                username: 'sort_admin',
                password: 'sort_@dmin',
            }
        },

        methods: {
            login() {
                let data = {
                    'username': this.username,
                    'password': this.password,
                }
                this.$http.post('auth/login',data).then((response) => {
                    let response_data = response.data
                    if (response_data.result) {
                        let user_data = response_data.user
                        this.$auth.setToken(user_data.api_token)
                        this.$router.push('/')
                    } else {
                        alert(response_data.message)
                    }
                })
            }
        }
    }
</script>