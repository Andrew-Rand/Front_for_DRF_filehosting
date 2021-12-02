<template>

    <Nav/>

    <div class='padd container text-center'>
        <form class='needs-validation' @submit.prevent='submitForm' novalidate>

            <div>
                <label for="validationCustomUsername" class="form-label">Username</label>
                <div class="input-group has-validation">
                    <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'username' placeholder='Username' required>
                    <div class="invalid-feedback">
                        Please, select user.
                    </div>
                </div>
            </div>

            <br>

            <div>
                <label for="validationCustomUsername" class="form-label">Email</label>
                <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="email" class="form-control" id="validationCustomEmail" aria-describedby="inputGroupPrepend" v-model = 'email' placeholder='example@gmail.com' required>
                    <div class="invalid-feedback">
                        Please, use valid email.
                    </div>
                </div>
            </div>

            <br>

            <div>
                <label for="validationCustomUsername" class="form-label">Name</label>
                <div class="input-group has-validation">
                    <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'first_name' placeholder='Name' required>
                    <div class="invalid-feedback">
                        First name must contain at least 1 letter
                    </div>
                </div>
            </div>

            <br>

            <div>
                <label for="validationCustomUsername" class="form-label">Last name</label>
                <div class="input-group has-validation">
                    <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'last_name' placeholder='Lastname' required>
                    <div class="invalid-feedback">
                        First name must contain at least 1 letter
                    </div>
                </div>
            </div>

            <br>

            <div>
                <label for="validationCustomUsername" class="form-label">Age</label>
                <div class="input-group has-validation">
                    <input type="age" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'age' placeholder='You must me more then 5 year old' required>
                    <div class="invalid-feedback">
                        Select your age from 5 to 100 years
                    </div>
                </div>
            </div>

            <br>

            <div>
                <label for="validationCustomUsername" class="form-label">Password</label>
                <div class="input-group has-validation">
                    <input type="password" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'password' placeholder= 'Password must contains number, lowercase, uppercase and spec char' required>
                    <div class="invalid-feedback">
                        Please check your password. Must contains number, lowercase, uppercase and spec char
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
            axios
                .post('register/', formData)
                .then(response => {
                    console.log(response)
                    this.$router.push('/login')
                })
                .catch(error => {
                  //  alert(error)
                    console.log(error)
                })
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