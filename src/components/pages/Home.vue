<template>
    <div>
        <div class="columns is-mobile">
            <div class="column is-one-half is-offset-one-quarter">
               <button class="button is-primary" @click.prevent="goTo('/card-pre-reg')">Card Pre-registration</button>
               <button class="button is-primary" @click.prevent="goTo('/stores')">Stores</button>
            </div>
       </div>
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
                
            }
        },

        computed: {
            
        },

        methods: {
            goTo(route) {
                this.$router.push(route)
            }
        },

        created() {
            
        }
    }
</script>