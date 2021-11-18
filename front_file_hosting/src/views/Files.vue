<template>
    <div class='container'>
        <h1>All user files</h1>
        <span :src='filedata'>{{ file_data }}</span>
        <div class="container">
            <h3>All your files</h3>
                <button class="btn btn-success" @click='DownloadAll'>Download ALL</button>
                <div class='container' v-for='file in file_data' :key='file.id'>
                <br>
                <h4>{{ file.name}}</h4>
                <button class="btn btn-primary btn-lg btn-block" @click='Download'>Download</button>
                <p>Type: {{ file.type }}</p>
                <p>Data created: {{ file.date_created }}</p>
                <p>Data modified: {{ file.date_modified }}</p>
                <form @submit.prevent='submitForm'>
                    <label>Description:</label>
                    <input class="form-control" type='description' name='description' v-model = 'description'><br>
                    <button class="btn btn-warning" type='submit'>Change description</button>
                </form>
                <br>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

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

            axios
                .get('files//')
                .then(
                    response => {
                        console.log(response)
                        this.file_data = response.data.data.result
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
        },
        submitForm(){
            const formData = {
                description: this.description,
            }
            axios
                .patch('files/{{ file.id }}/', formData)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        Download() {
            console.log('download start')

            console.log('download finish')
        },
        DownloadAll() {
            console.log('download start')
            axios
                .get('files/download/')
                .then(
                    response => {
                        console.log(response)
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
            console.log('download finish')
        }
    }
}
</script>
