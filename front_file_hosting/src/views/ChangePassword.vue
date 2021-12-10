<template>

    <Nav/>

    <div class='container pad text-center'>
        <h3 class='text-center wel_shad'>Change password</h3>
    </div>

    <div class='container padd text-center'>
        <br>


        <div>
             <form class='needs-validation' @submit.prevent='submitForm' novalidate>

                <div>
                    <div v-if="passw" class="input-group has-validation">
                        <input type="password" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'password' placeholder= 'Password' required>
                        <div class="invalid-feedback">
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

                <div>
                    <div v-if="passwn" class="input-group has-validation">
                        <input type="password" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'new_password' placeholder= 'New password' required>
                        <div class="invalid-feedback">
                            Please add new password
                        </div>
                    </div>

                    <div v-if="!passwn" class="input-group has-validation">
                        <input type="password" class="form-control is-invalid" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'new_password' placeholder= 'Repeat new password' required>
                        <div class="invalid-feedback">
                            Please, add new password and try again
                        </div>
                    </div>
                </div>

                <br>

                <div>
                    <div v-if="passwr" class="input-group has-validation">
                        <input type="password" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'new_password_repeated' placeholder= 'Confirm new password' required>
                        <div class="invalid-feedback">
                            Please repeat your your password
                        </div>
                    </div>

                    <div v-if="!passwr" class="input-group has-validation">
                        <input type="password" class="form-control is-invalid" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'new_password_repeated' placeholder= 'Confirm new password' required>
                        <div class="invalid-feedback">
                            Please, repeat new password and try again
                        </div>
                    </div>
                </div>

                <br>

                <button class="btn btn-outline-primary btn-lg" type='submit'>Change Password</button>
            </form>


        </div>
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
            'new_password_repeated': '',
            'passw': true,
            'passwn': true,
            'passwr': true
        }
    },
    mounted() {
        this.validateForm()
    },
    methods: {
        submitForm(){
            const formData = {
                password: this.password,
                new_password: this.new_password,
                new_password_repeated: this.new_password_repeated,
            }

            var re = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{10,}/

            if (this.new_password.match(re) && this.new_password_repeated.match(re)) {

            if (this.password && this.new_password && this.new_password_repeated){

            axios
                .put('change_password/', formData)
                .then(response => {
                    console.log(response)

                    this.passw = true,
                    this.passwn = true,
                    this.passwr = true

                    this.$router.push('/login')
                })
                .catch(error => {
                    console.log(error)
                    //alert(error)

                    this.passw = false,
                    this.passwn = false,
                    this.passwr = false


                    let fields = error.response.data.data.error_detail[0].non_field_errors

                    this.passw = true,
                    this.passwn = true,
                    this.passwr = true

                        if (fields.includes("{'incorrect password'}")) {
                            this.passw = false
                            this.password = ''
                        }

                        if (fields.includes("{'new passwords do not match'}")) {
                            this.passwn = false
                            this.passwr = false
                            this.new_password = ''
                            this.new_password_repeated = ''
                        }

                        if (fields.age) {
                            this.ag = false
                        }
                })
        }} else {


            this.passwn = false
            this.passwr = false
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
padding-left: 25vw;
padding-right: 25vw;
}
.wel_shad{
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3)
}
</style>