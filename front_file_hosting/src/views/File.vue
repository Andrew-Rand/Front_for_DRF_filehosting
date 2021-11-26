<template>
    <div class='container pad'>
        <h2 class='text-center wel_shad'>File detail</h2>
        <div class="container">
            <br>
            <h4>{{ file_data.name}}</h4><br>
            <p>Type: {{ file_data.type }}</p>
            <p>Data created: {{ file_data.date_created }}</p>
            <p>Data modified: {{ file_data.date_modified }}</p>
            <form @submit.prevent='submitForm'>
                <label>Description:</label>
                <input class="form-control" type='description' name='description' v-model = 'description'>
                <button class="btn btn-outline-warning text-center" type='submit'>Change description</button>
            </form>
            <br>
            <button class="btn btn-outline-success btn-lg btn-block" @click='Download(file_data.name)'>Download</button><br>
            <br>
            <br>
            <button class="btn btn-outline-danger" @click='Delete'>Delete file</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const config = require('../config');

export default {
    name: 'Files',
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

                    this.$router.push('/files')
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