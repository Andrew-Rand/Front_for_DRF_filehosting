<template>
    <div class='container'>
        <h1>Log in</h1>
        <br>
        <form @submit.prevent='submitForm'>
            <label>Username:</label>
            <input class="form-control" type='username' name='username' v-model = 'username'> <br>
            <label>Password:</label>
            <input class="form-control" type='password' name='password' v-model = 'password'> <br>
            <button class="btn btn-success" type='submit'>Log in</button>
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
            password: ''
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
                .post('accounts/login/', formData)
                .then(response => {
                    console.log(response)

                    console.log(response.data.data.result.access_token)
                    console.log(response.data.data.result.refresh_token)

                    const access = response.data.data.result.access_token
                    const refresh = response.data.data.result.refresh_token

                    localStorage.setItem('access', access)
                    localStorage.setItem('refresh', refresh)

                    this.$store.commit('setAccess', access)
                    this.$store.commit('setRefresh', refresh)

                    axios.defaults.headers.common['Authorization'] = access



                    this.$router.push('/user')

                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>
