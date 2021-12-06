<template>

    <Nav/>

    <div class='container pad text-center'>
        <div class="container">
        <br><br>
        <h4>{{ file_data.name }}</h4><br>

        <div class="row border rounded-3">

            <div class="col-auto">
            <img :src="image" width="300" height="300" class='me-3' />
            </div>
            <div class="col-sm">
            <p>Type: {{ file_data.type }}</p>
            <p>Date created: {{ file_data.date_created }}</p>
            <p>Date modified: {{ file_data.date_modified }}</p>
            <form @submit.prevent='submitForm'>
                <label>Description:</label>
                <textarea class="form-control" name='description' v-model = 'description'></textarea>
                <button class="btn btn-outline-primary text-center" type='submit'>Change description</button>
            </form>
            </div>
            <div class="col-auto">
            <br>
            <img style="cursor:pointer" width="50" height="50" src="../assets/download.png" @click='Download' alt="download" />
            <br>
            <br>
            <img style="cursor:pointer" width="50" height="50" src="../assets/delete.png" @click='Delete(file.id)' alt="delete"/>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Nav from "../components/Nav.vue"

const config = require('../config');

export default {
    name: 'Files',
        components: {
        Nav
    },
    data() {
        return{
            file_data: []
        }
    },
    mounted() {
        this.getMe()
    },
    methods: {
        getMe() {
            console.log(localStorage.getItem('file_id'))
            axios({
                    url: config.BaseFileUrl + localStorage.getItem('file_id') + '/',
                    method: 'GET',
                })
                .then(
                    response => {
                        console.log(response)
                        this.file_data = response.data
                        this.description = response.data.description
                        let string_array = this.file_data.name.split('.')
                        console.log(localStorage.getItem('user_id'))
                        this.image = config.FileStorageUrl + 'tumbs/' + localStorage.getItem('user_id') + '/' + string_array[0] + '_tumbnail' + '.png'
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
            const formData = {
                description: this.description,
            }
            axios({
                    url: config.BaseFileUrl + localStorage.getItem('file_id') + '/',
                    method: 'PATCH',
                    data: formData

                })
                .then(response => {
                    console.log(response)
                    alert('File description has changed.')
                    this.$router.push('/file-detail')
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
        },
        Download(name) {
            console.log('download start')

            axios({
                    url: config.BaseFileUrl + localStorage.getItem('file_id') + '/download/',
                    method: 'GET',
                    responseType: 'blob',
                })
                .then(response => {
                    console.log(response)

                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', name);
                    document.body.appendChild(fileLink);
                    fileLink.click();

                })
                .catch(
                    error => {
                        console.log(error)
                        alert(error)
                    }
                )

            console.log('download finish')
        },
        Delete() {
            let result = confirm('Do you really want to delete your file?')
            if (result === true) {
            axios({
                    url: config.BaseFileUrl + localStorage.getItem('file_id')+ '/',
                    method: 'DELETE',
                })
                .then(response => {
                    console.log(response)
                    this.$router.push('/files');
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
            } else {
                console.log('You save your file')
            }

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