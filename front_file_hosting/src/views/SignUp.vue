<template>
    <div class='container pad'>
        <h2 class='text-center wel_shad'>Register a new user</h2>
        <form @submit.prevent='submitForm'>
            <label>Username:</label>
            <input class="form-control" type='username' name='username' v-model = 'username'> <br>
            <label>Email:</label>
            <input class="form-control" type='email' name='email' v-model = 'email'> <br>
            <label>First Name:</label>
            <input class="form-control" type='first_name' name='first_name' v-model = 'first_name'> <br>
            <label>Last name:</label>
            <input class="form-control" type='last_name' name='last_name' v-model = 'last_name'> <br>
            <label>Age:</label>
            <input class="form-control" type='age' name='age' v-model = 'age'> <br>
            <label>Password:</label>
            <input class="form-control" type='password' name='password' v-model = 'password'><br>
            <button class="btn btn-success btn-lg" type='submit'>Create new user</button>
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
                .post('register/', formData)
                .then(response => {
                    console.log(response)
                    this.$router.push('/login')
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
.pad {
padding-left: 8vw;
padding-right: 8vw;
}
.wel_shad{
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3)
}
</style>