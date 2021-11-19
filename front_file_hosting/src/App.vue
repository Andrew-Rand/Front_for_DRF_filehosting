<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/register">Sign up</router-link> |
    <router-link to="/login">log in</router-link> |
    <router-link to="/user">User</router-link> |
    <router-link to="/user/change_password">Change Password</router-link> |
    <router-link to="/files">Files</router-link> |
    <router-link to="/upload">Upload</router-link> |
    <router-link to="/file_detail">File</router-link> |
  </div>

  <div class="container d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
    <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
        <span class="fs-4"><i>The best storage for your files</i></span>
    </a>
    <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <a class="me-3 py-2 text-dark text-decoration-none" href="#/">Home</a>
        <a class="me-3 py-2 text-dark text-decoration-none" href="#/register">Sign Up</a>
        <a class="py-2 me-4 text-dark text-decoration-none" href="#/login">Login</a>
        <a class="py-2 me-4 text-dark text-decoration-none" href="#/user">Profile</a>
        <a class="py-2 me-4 text-dark text-decoration-none" href="#/files">Files</a>
        <a class="btn btn-primary" href="http://127.0.0.1:1338/api/files/template/">Upload File</a>
    </nav>
  </div>

  <router-view/>

</template>

<script>
import axios from 'axios'

export default {
    name: 'App',
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
            this.getAccess()
        }, 59000)
    },
    methods: {
        getAccess(){
            const accessData = {
                refresh: this.$store.state.refresh
            }

        axios
            .post('accounts/refresh/', accessData)
            .then(response => {

                console.log(response.data.data.result.access_token)
                console.log(response.data.data.result.refresh_token)

                const access = response.data.data.result.access_token
                const refresh = response.data.data.result.refresh_token

                localStorage.setItem('access', access)
                localStorage.setItem('refresh', refresh)

                this.$store.commit('setAccess', access)
                this.$store.commit('setRefresh', refresh)

                axios.defaults.headers.common['Authorization'] = access

            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}

</script>

<style lang="scss">
    @import './style/style.css';
</style>
