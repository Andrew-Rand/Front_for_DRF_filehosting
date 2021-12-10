<template>

    <Nav/>

    <div class='padd container text-center'>
        <h3 class='text-center wel_shad'>Create profile</h3>
        <br>
        <form class='needs-validation' @submit.prevent='submitForm' novalidate>

            <div>
                <div v-if="usr" class="input-group has-validation">
                    <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'username' placeholder='Username' required>
                    <div class="invalid-feedback">
                        Please, select user.
                    </div>
                </div>

                <div v-if="!usr" class="input-group has-validation">
                    <input type="text" class="form-control is-invalid" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'username' placeholder='Username' required>
                    <div class="invalid-feedback">
                        This user already exist
                    </div>
                </div>

            </div>

            <br>

            <div>

                <div v-if="em" class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="email" class="form-control" id="validationCustomEmail" aria-describedby="inputGroupPrepend" v-model = 'email' placeholder='Email' required>
                    <div class="invalid-feedback">
                        Please, use valid email, like example@gmail.com
                    </div>
                </div>

                <div v-if="!em" class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="email" class="form-control is-invalid" id="validationCustomEmail" aria-describedby="inputGroupPrepend" v-model = 'email' placeholder='example@gmail.com' required>
                    <div class="invalid-feedback">
                        Please, use valid email, like example@gmail.com
                    </div>
                </div>
            </div>

            <br>

            <div>
                <div class="input-group has-validation">
                    <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'first_name' placeholder='Name' required>
                    <div class="invalid-feedback">
                        First name must contain at least 1 letter
                    </div>
                </div>
            </div>

            <br>

            <div>

                <div class="input-group has-validation">
                    <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'last_name' placeholder='Last name' required>
                    <div class="invalid-feedback">
                        First name must contain at least 1 letter
                    </div>
                </div>
            </div>

            <br>

            <div>
                <div v-if="ag" class="input-group has-validation">
                    <input type="number" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'age' placeholder='Age' required>
                    <div class="invalid-feedback">
                        Select your age from 5 to 100 years
                    </div>
                </div>

                <div v-if="!ag" class="input-group has-validation">
                    <input type="number" class="form-control is-invalid" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'age' placeholder='Age' required>
                    <div class="invalid-feedback">
                        Select your age from 5 to 100 years
                    </div>
                </div>
            </div>

            <br>

            <div>

                <div v-if="passw" class="input-group has-validation">
                    <input type="password" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'password' placeholder= 'Password' required>
                    <div class="invalid-feedback">
                        Password must contain upper, lower, number and spec char
                    </div>
                </div>

                <div v-if="!passw" class="input-group has-validation">
                    <input type="password" class="form-control is-invalid" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'password' placeholder= 'Password' required>
                    <div class="invalid-feedback">
                        Password must contain upper, lower, number and spec char
                    </div>
                </div>
            </div>

            <br>

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
            'usr': true,
            'passw': true,
            'ag': true,
            'em': true
        }
    },
    mounted() {
        this.validateForm()
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
            if (this.username && this.password && this.first_name && this.last_name && this.email && this.age) {
                axios
                    .post('register/', formData)
                    .then(response => {
                        console.log(response)
                        this.$router.push('/login')

                        this.passw = true
                        this.usr = true
                        this.ag = true
                        this.em = true
                    })
                    .catch(error => {
                      //  alert(error)
                        console.log(error)

                        console.log(error.response.data.data.error_detail[0])

                        let fields = error.response.data.data.error_detail[0]

                        this.passw = true
                        this.usr = true
                        this.ag = true
                        this.em = true


                        if (fields.email) {
                            this.em = false
                            this.email = ''
                        }

                        if (fields.password) {
                            this.passw = false
                            this.password = ''
                        }

                         if (fields.username) {
                            this.usr = false
                            this.username = ''
                        }

                         if (fields.age) {
                            this.ag = false
                            this.age = ''
                        }

                    })
        }},
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