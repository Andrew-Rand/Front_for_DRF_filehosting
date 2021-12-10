<template>

    <Nav/>

    <div class='container pad text-center'>
        <h3 class='text-center wel_shad'>About {{ user_data.username }}</h3>
        <span hidden :src='userdata'>{{ user_data }}</span>
    </div>
    <br><br>
<div class='padd container text-center'>
        <form class='needs-validation' @submit.prevent='submitForm' novalidate>
            <div>
                <label for="validationCustomUsername" class="form-label">Email</label>
                <div v-if="em" class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="email" class="form-control" id="validationCustomEmail" aria-describedby="inputGroupPrepend" v-model = 'email' placeholder='example@gmail.com' required>
                    <div class="invalid-tooltip">
                        Please, use valid email.
                    </div>
                </div>

                <div v-if="!em" class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="email" class="form-control is-invalid" id="validationCustomEmail" aria-describedby="inputGroupPrepend" v-model = 'email' placeholder='example@gmail.com' required>
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
                    <div class="invalid-tooltip">
                        First name must contain at least 1 letter
                    </div>
                </div>
            </div>

            <br>

            <div>
                <label for="validationCustomUsername" class="form-label">Last name</label>
                <div class="input-group has-validation">
                    <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'last_name' placeholder='Lastname' required>
                    <div class="invalid-tooltip">
                        First name must contain at least 1 letter
                    </div>
                </div>
            </div>

            <br>

            <div>
                <label for="validationCustomUsername" class="form-label">Age</label>
                <div v-if="ag" class="input-group has-validation">
                    <input type="number" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'age' placeholder='Select your age from 5 to 100 years' required>
                    <div class="invalid-tooltip">
                        Select your age from 5 to 100 years
                    </div>
                </div>

                <div v-if="!ag" class="input-group has-validation">
                    <input type="number" class="form-control is-invalid" id="validationCustomUsername" aria-describedby="inputGroupPrepend" v-model = 'age' placeholder='Select your age from 5 to 100 years' required>
                    <div class="invalid-feedback">
                        Select your age from 5 to 100 years
                    </div>
                </div>
            </div>

            <br>

            <button class="btn btn-outline-primary me-3" type='submit'>Update profile</button>
            <button class="btn btn-outline-primary" @click='navigateHtml'>Change password</button>
        </form>

    </div>
</template>

<script>
import axios from 'axios'
import Nav from "../components/Nav.vue"

export default {
    name: 'User',
        components: {
        Nav
    },
    data() {
        return{
            user_data: '',
            'ag': true,
            'em': true
        }
    },
    mounted() {
        this.getMe()
        this.validateForm()
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

                        localStorage.setItem('user_id', response.data.id)
                        this.$store.commit('setUserId', response.data.id)

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

            if (this.first_name && this.last_name && this.email && this.age){

            axios
                .patch('profile/', formData)
                .then(response => {
                    console.log(response)
                    alert('User data have changed.')

                    this.ag = true
                    this.em = true

                    this.$router.push('/user')
                })
                .catch(error => {
                    console.log(error)

                        this.ag = true
                        this.em = true

                    let fields = error.response.data.data.error_detail[0]

                        this.ag = true
                        this.em = true


                        if (fields.email) {
                            this.em = false
                        }

                         if (fields.age) {
                            this.ag = false
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
    },
        navigateHtml() {
            window.location.href = '#/user/change-password'
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