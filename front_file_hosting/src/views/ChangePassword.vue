<template>
    <div class='user_page'>
        <h1>Change_password</h1>
        <form @submit.prevent='submitForm'>
            <label>Password:</label>
            <input type='password' name='password' v-model = 'password'> <br><br>
            <label>New Password:</label>
            <input type='password' name='new_password' v-model = 'new_password'> <br><br>
            <label>New Password repeat:</label>
            <input type='password' name='new_password_repeated' v-model = 'new_password_repeated'> <br><br>
            <button type='submit'>Change Password</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ChangePassword',
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
                .put('accounts/change_password/', formData)
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
