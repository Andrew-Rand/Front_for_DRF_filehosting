<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/register">Sign up</router-link> |
    <router-link to="/login">log in</router-link> |
    <router-link to="/user">User</router-link> |
    <router-link to="/user/edit">User Edit</router-link> |
    <router-link to="/user/change_password">Change Password</router-link> |
    <router-link to="/files">Files</router-link> |
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
