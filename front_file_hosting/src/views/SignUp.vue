<template>

    <Nav/>

    <div class='padd container text-center'>
        <form @submit.prevent='submitForm'>
            <label>Username:</label>
            <input class="form-control" type='username' name='username' v-model = 'username' placeholder='Username'> <br>
            <label>Email:</label>
            <input class="form-control" type='email' name='email' v-model = 'email' placeholder='example@gmail.com'> <br>
            <label>First Name:</label>
            <input class="form-control" type='first_name' name='first_name' v-model = 'first_name' placeholder='Name'> <br>
            <label>Last name:</label>
            <input class="form-control" type='last_name' name='last_name' v-model = 'last_name' placeholder='Lastname'> <br>
            <label>Age:</label>
            <input class="form-control" type='age' name='age' v-model = 'age' placeholder='You must me more then 5 year old'> <br>
            <label>Password:</label>
            <input class="form-control" type='password' name='password' v-model = 'password' placeholder= 'Password must contains number, lowercase, uppercase and spec char'><br>
            <button class="btn btn-outline-primary btn-lg" type='submit'>Sign up</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Nav from "../components/Nav.vue"

export default {
    name: 'SignUp',
        components: {
        Nav
    },
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

.padd {
padding-left: 30vw;
padding-right: 30vw;
}

.wel_shad{
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3)
}
</style>