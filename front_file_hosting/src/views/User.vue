<template>
    <div class='user-page'>
        <h1>About you</h1>
        <span :src='userdata'>{{ user_data }}</span>
    </div>
    <form @submit.prevent='submitForm'>
        <label>Email:</label>
        <input type='email' name='email' v-model = 'email'> <br><br>
        <label>First Name:</label>
        <input type='text' name='first_name' v-model = 'first_name'> <br><br>
        <label>Last name:</label>
        <input type='last_name' name='last_name' v-model = 'last_name'> <br><br>
        <label>Age:</label>
        <input type='age' name='age' v-model = 'age'> <br><br>
        <button type='submit'>Change user data</button>
    </form>
    <button @click='navigateHtml'>Change password</button>
</template>

<script>
import axios from 'axios'

export default {
    name: 'User',
    data() {
        return{
            user_data: ''
        }
    },
    mounted() {
        this.getMe()
    },
    methods: {
        getMe() {

            axios
                .get('accounts/profile/')
                .then(
                    response => {
                        console.log(response)
                        this.user_data = response.data
                        this.age = response.data.age
                        this.email = response.data.email
                        this.first_name = response.data.first_name
                        this.last_name = response.data.last_name
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
        },
        submitForm(){
            const formData = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                age: this.age,
            }
            axios
                .patch('accounts/profile/', formData)
                .then(response => {
                    console.log(response)
                    this.$router.push('/user')
                })
                .catch(error => {
                    console.log(error)
                })
        },
        navigateHtml() {
            window.location.href = '#/user/change_password'
        }
    }
}
</script>
