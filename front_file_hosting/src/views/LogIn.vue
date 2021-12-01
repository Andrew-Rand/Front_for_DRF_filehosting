<template>
    <div class='container padd text-center'>
        <h2 class='text-center wel_shad'>Log in</h2>
        <br>
        <form @submit.prevent='submitForm'>
            <label>Username:</label>
            <input class="form-control "  type='text' name='username' v-model = 'username'> <br>
            <label>Password:</label>
            <input class="form-control" type='password' name='password' v-model = 'password'> <br>
            <button class="btn btn-outline-primary btn-lg" type='submit'>Log in</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LogIn',
    data() {
        return{
            username: '',
            password: '',
            is_log: true
        }
    },
    methods:{
        submitForm() {
            axios.defaults.headers.common['Authorization'] = ''
            localStorage.removeItem('access')

            const formData = {
                username: this.username,
                password: this.password
            }

            axios
                .post('login/', formData)
                .then(response => {

                    console.log(response)

                    console.log(response.data.data.result.access_token)
                    console.log(response.data.data.result.refresh_token)

                    const access = response.data.data.result.access_token
                    const refresh = response.data.data.result.refresh_token
                    const is_login = true

                    localStorage.setItem('access', access)
                    localStorage.setItem('refresh', refresh)
                    localStorage.setItem('is_login', is_login)

                    this.$store.commit('setAccess', access)
                    this.$store.commit('setRefresh', refresh)
                    this.$store.commit('setIsLogin', is_login)

                    console.log(localStorage.getItem('is_login'))

                    axios.defaults.headers.common['Authorization'] = access

                    this.$router.push('/files')
                    this.is_log = true

                })
                .catch(error => {
                    alert(error)
                    console.log(error)
                })
        }
    }
}
</script>

<style>

.padd {
padding-left: 30vw;
padding-right: 30vw;
}

.wel_shad{
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3)
}
</style>