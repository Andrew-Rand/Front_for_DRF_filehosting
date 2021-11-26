<template>
    <div class='container pad'>
        <h2 class='text-center wel_shad'>About you</h2>
        <span hidden :src='userdata'>{{ user_data }}</span>
    </div>
    <div class='container pad'>
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
                .get('profile/')
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
                        alert(error)
                    }
                )
        },
        submitForm(){
            console.log(this.user_data.email)
            let formData = {
                first_name: this.first_name,
                last_name: this.last_name,
                age: this.age
                }
            if (this.user_data.email !== this.email) {
                formData = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    age: this.age,
                    email: this.email,
                }
            }
            axios
                .patch('profile/', formData)
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
            window.location.href = '#/user/change-password'
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