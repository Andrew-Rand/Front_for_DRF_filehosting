<template>

    <Nav/>

    <div class='container padd text-center'>
        <br>
        <form @submit.prevent='submitForm'>
            <label>Password:</label>
            <input class="form-control" type='password' name='password' v-model = 'password'> <br>
            <label>New Password:</label>
            <input class="form-control" type='password' name='new_password' v-model = 'new_password'> <br>
            <label>Confirm new password:</label>
            <input class="form-control" type='password' name='new_password_repeated' v-model = 'new_password_repeated'> <br>
            <button class="btn btn-outline-primary btn-lg" type='submit'>Change Password</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Nav from "../components/Nav.vue"

export default {
    name: 'ChangePassword',
        components: {
        Nav
    },
    data() {
        return {
            'password': '',
            'new_password': '',
            'new_password_repeated': ''
        }
    },
    methods: {
        submitForm(){
            const formData = {
                password: this.password,
                new_password: this.new_password,
                new_password_repeated: this.new_password_repeated,
            }
            axios
                .put('change_password/', formData)
                .then(response => {
                    console.log(response)
                    this.$router.push('/login')
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
        }
    }
}
</script>

<style>
.padd {
padding-left: 25vw;
padding-right: 25vw;
}
.wel_shad{
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3)
}
</style>