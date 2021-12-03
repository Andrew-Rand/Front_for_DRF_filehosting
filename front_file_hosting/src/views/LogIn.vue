<template>

    <Nav/>

    <div class='container padd text-center'>
        <h2 class='text-center wel_shad'>Log in</h2>
        <br>
        <form class='needs-validation' @submit.prevent='submitForm' novalidate>

            <div>
                <label for="validationCustomUsername" class="form-label">Username</label>
                <div v-if="usr" class="input-group has-validation">
                    <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'username' placeholder='Username' required>
                    <div class="invalid-tooltip">
                        Please, select user.
                    </div>
                </div>

                <div v-if="!usr" class="input-group has-validation">
                    <input type="text" class="form-control is-invalid" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'username' placeholder='Username' required>
                    <div class="invalid-feedback">
                        Please, select user
                    </div>
                </div>

            </div>

            <br>

            <div>
                <label for="validationCustomUsername" class="form-label">Password</label>
                <div v-if="passw" class="input-group has-validation">
                    <input type="password" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'password' placeholder= 'Password' required>
                    <div class="invalid-tooltip">
                        Please check your password
                    </div>
                </div>

                <div v-if="!passw" class="input-group has-validation">
                    <input type="password" class="form-control is-invalid" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'password' placeholder= 'Password' required>
                    <div class="invalid-feedback">
                        Please, check your password and try again
                    </div>
                </div>
            </div>

            <br>

            <button class="btn btn-outline-primary btn-lg" type='submit'>Log in</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Nav from "../components/Nav.vue"

export default {
    name: 'LogIn',
    components: {
        Nav
    },
    data() {
        return{
            username: '',
            password: '',
            is_log: true,
            passw: true,
            usr: true,
        }
    },
    mounted() {
        this.validateForm()
    },
    methods:{
        submitForm() {
            if (this.username && this.password) {
                axios.defaults.headers.common['Authorization'] = ''
                localStorage.removeItem('access')

                const formData = {
                    username: this.username,
                    password: this.password
                }

                axios
                    .post('login/', formData)
                    .then(response => {

                        console.log(response)

                        console.log(response.data.data.result.access_token)
                        console.log(response.data.data.result.refresh_token)

                        const access = response.data.data.result.access_token
                        const refresh = response.data.data.result.refresh_token

                        localStorage.setItem('access', access)
                        localStorage.setItem('refresh', refresh)

                        this.$store.commit('setAccess', access)
                        this.$store.commit('setRefresh', refresh)


                        axios.defaults.headers.common['Authorization'] = access

                        this.$router.push('/files')
                        this.is_log = true
                        this.passw = true
                        this.usr = true

                        console.log(response.data)

                        if (response.data.data == 0) {
                        console.log('hi')
                        }


                    })
                    .catch(error => {
                        //alert(error)
                        this.passw = false
                        this.usr = false
                        console.log(this.passw, this.usr)
                        console.log(error.response.data.data.error_detail)


                        let selectObject = error.response.data.data.error_detail
                        for (var i = 0; i < selectObject.length; i++) {
                                console.log(selectObject[i])
                            }


                    })
                }
        },
                validateForm () {
            'use strict'

          // take all forms
          var forms = document.querySelectorAll('.needs-validation')

        // cycle to forms
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
            form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                 event.stopPropagation()
             }

        form.classList.add('was-validated')
      }, false)
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