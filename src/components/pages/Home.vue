<template>
    <div>
        <div class="columns is-mobile is-centered">
            <div class="column has-text-centered">
                <div class="section">
                    <div class="page-buttons" @click.prevent="goTo('/card-pre-reg')">
                        <p>Card Pre-Registration</p>
                    </div>
                    <div class="page-buttons" @click.prevent="goTo('/stores')">
                        <p>Store List</p>
                    </div>

                </div>
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