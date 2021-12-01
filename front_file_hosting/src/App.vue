<template>
<!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/register">Sign up</router-link> |
    <router-link to="/login">log in</router-link> |
    <router-link to="/user">User</router-link> |
    <router-link to="/user/change-password">Change Password</router-link> |
    <router-link to="/files">Files</router-link> |
    <router-link to="/upload">Upload</router-link> |
    <router-link to="/file-detail">File</router-link> |
  </div> -->



  <router-view/>

</template>

<script>
import axios from 'axios'

export default {
    name: 'App',
    data() {
        return{
            is_log: false
        }
    },
    beforeCreate() {
        this.$store.commit('initializeStore')

        const access = this.$store.state.access

        if ( access ) {
            axios.defaults.headers.common['Authorization'] = access
        } else {
            axios.defaults.headers.common['Authorization'] = ''
        }

    },
    mounted() {
        setInterval(() => {
            this.getAccess(),
            this.getMe()
        }, 100000)
        this.getMe()
        console.log(this.is_log)
        console.log(localStorage.getItem('access'))

    },
    methods: {
        getMe() {
            this.is_log = localStorage.getItem('is_login')
        },
        getAccess(){
            const accessData = {
                refresh: this.$store.state.refresh
            }

        axios
            .post('refresh/', accessData)
            .then(response => {

                console.log(response.data.data.result.access_token)
                console.log(response.data.data.result.refresh_token)

                const responseData = response.data;

                const access = responseData.data && responseData.data.result && responseData.data.result.access_token
                const refresh = responseData.data && responseData.data.result && responseData.data.result.refresh_token

                localStorage.setItem('access', access)
                localStorage.setItem('refresh', refresh)

                this.$store.commit('setAccess', access)
                this.$store.commit('setRefresh', refresh)

                axios.defaults.headers.common['Authorization'] = access

            })
            .catch(error => {
                console.log(error)
            })
        },
    }
}

</script>



<style lang="scss">
    @import './style/style.css';
.glow {
    color: #fff;
    transition: all 300ms;
    text-shadow: 0 0 10px #0698a5,
                 0 0 30px #0698a5,
                 0 0 80px #0698a5,
                 0 0 120px #0698a5,
                 0 0 200px #0698a5;
}

.pad {
padding-left: 30vw;
padding-right: 30vw;
}

</style>
