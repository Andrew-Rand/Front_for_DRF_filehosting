<template>
    <div class='container pad'>
        <h2 class='text-center wel_shad'>Change Password</h2>
        <br>
        <form @submit.prevent='submitForm'>
            <label>Password:</label>
            <input class="form-control" type='password' name='password' v-model = 'password'> <br>
            <label>New Password:</label>
            <input class="form-control" type='password' name='new_password' v-model = 'new_password'> <br>
            <label>Confirm new password:</label>
            <input class="form-control" type='password' name='new_password_repeated' v-model = 'new_password_repeated'> <br>
            <button class="btn btn-outline-success" type='submit'>Change Password</button>
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
.pad {
padding-left: 8vw;
padding-right: 8vw;
}
.wel_shad{
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3)
}
</style>