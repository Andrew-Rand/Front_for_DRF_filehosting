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


            localStorage.removeItem('access')
            localStorage.removeItem('refresh')


            this.$store.commit('setAccess', access)
            this.$store.commit('setRefresh', refresh)




            axios.defaults.headers.common['Authorization'] = access


            this.$router.push('/login')
        }

    }
}


</script>

