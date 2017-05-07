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
                let vm = this
                let data = {
                    'username': vm.username,
                    'password': vm.password,
                }
                vm.$http.post('auth/login',data).then((response) => {
                    let response_data = response.data
                    if (response_data.result) {
                        let user_data = response_data.user
                        vm.$auth.setToken(user_data.api_token).then((result) => {
                            console.log(result)
                            console.log('Authenticated!')
                            vm.$store.state.isAuth = true
                            vm.$router.push('/admin')
                        });
                    } else {
                        alert(response_data.message)
                    }
                })
            }
        }
    }
</script>