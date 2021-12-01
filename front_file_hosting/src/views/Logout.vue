<template>
    <h1>Logout</h1>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Logout',
    data() {
        return{
            is_log: false
        }
    },
    mounted() {
        this.getMe()
    },
    methods: {
        getMe() {

            const access = ''
            const refresh = ''
            const is_login = false

            localStorage.removeItem('access', access)
            localStorage.removeItem('refresh', refresh)
            localStorage.removeItem('is_login', is_login)

            this.$store.commit('setAccess', access)
            this.$store.commit('setRefresh', refresh)
            this.$store.commit('setIsLogin', is_login)

            console.log(localStorage.getItem('is_login'))

            axios.defaults.headers.common['Authorization'] = access


            this.$router.push('/login')
        }

    }
}


</script>

