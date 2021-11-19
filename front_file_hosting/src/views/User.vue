<template>
    <div class='container'>
        <h1>About you</h1>
        <span :src='userdata'>{{ user_data }}</span>
    </div>
    <div class='container'>
    <form @submit.prevent='submitForm'>
        <label>Email:</label>
        <input class="form-control" type='email' name='email' v-model = 'email'> <br>
        <label>First Name:</label>
        <input class="form-control" type='text' name='first_name' v-model = 'first_name'> <br>
        <label>Last name:</label>
        <input class="form-control" type='last_name' name='last_name' v-model = 'last_name'> <br>
        <label>Age:</label>
        <input class="form-control" type='age' name='age' v-model = 'age'> <br>
        <button class="btn btn-success" type='submit'>Change user data</button>
    </form>
    <br>
    <button class="btn btn-warning" @click='navigateHtml'>Change password</button>
    </div>
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
                        alert(error + '. You are not authorized. Please login yourself before seeing your profile.')
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
                    alert('User data have changed.')
                    this.$router.push('/user')
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
        },
        navigateHtml() {
            window.location.href = '#/user/change_password'
        }
    }
}
</script>
