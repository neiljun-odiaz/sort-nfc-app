<template>
  <div>
    <div class="Header">
        <div class="container">
            <nav class="nav">
                <div class="nav-left">
                    <a class="nav-item" @click.prevent="$router.push('/')"><img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo"></a>
                </div>

                <div class="nav-right nav-menu">
                    <a class="nav-item" @click.prevent="logOut" v-show="isAuth">Logout</a>
                </div>
            </nav>
        </div>
    </div>
    
    <div class="container body-container">
        <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            
        }
    },

    computed: {
        isAuth() {
            return this.$store.state.isAuth
        }
    },

    methods: {
        logOut() {
            let vm = this
            vm.$auth.removeToken().then((result)=>{
                if (result) {
                    vm.$store.state.isAuth = false
                    vm.$router.push('/')
                    console.log('Logout')
                }
            });
        }
    },

    created() {
        // Check if already authenticated
        // this.$auth.isAuthenticated().then((result)=>{
        //     if (result) {
        //         this.$store.state.isAuth = true
        //     } else {
        //         this.$store.state.isAuth = false
        //     }
        // }).catch(function (error) {
        //     this.$store.state.isAuth = false
        // });
        console.log('is auth: ',this.$store.state.isAuth)
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
