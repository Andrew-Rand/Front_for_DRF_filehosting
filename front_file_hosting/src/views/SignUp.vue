<template>
    <div class='sign-up-page'>
        <h1>Register a new user</h1>
        <form @submit.prevent='submitForm'>
            <label>Username:</label>
            <input type='username' name='username' v-model = 'username'> <br><br>
            <label>Email:</label>
            <input type='email' name='email' v-model = 'email'> <br><br>
            <label>First Name:</label>
            <input type='first_name' name='first_name' v-model = 'first_name'> <br><br>
            <label>Last name:</label>
            <input type='last_name' name='last_name' v-model = 'last_name'> <br><br>
            <label>Age:</label>
            <input type='age' name='age' v-model = 'age'> <br><br>
            <label>Password:</label>
            <input type='password' name='password' v-model = 'password'> <br><br>
            <button type='submit'>Create new user</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SignUp',
    data() {
        return {
            'first_name': '',
            'last_name': '',
            'email': '',
            'password': '',
            'username': '',
            'age': '',
        }
    },
    methods: {
        submitForm(){
            const formData = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                username: this.username,
                age: this.age,
            }
            axios
                .post('accounts/register/', formData)
                .then(response => {
                    console.log(response)
                    this.$router.push('/login')
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>