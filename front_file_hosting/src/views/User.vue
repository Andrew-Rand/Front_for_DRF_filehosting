<template>
    <div class='user-page'>
        <h1>About you</h1>
        <span :src='userdata'>{{ user_data }}</span>
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
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
        }
    }
}
</script>
