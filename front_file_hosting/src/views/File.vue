<template>
    <div class='container'>
        <h1>File detail</h1>
        <div class="container">
            <br>
            <h4>{{ file_data.name}}</h4><br>
            <p>Type: {{ file_data.type }}</p>
            <p>Data created: {{ file_data.date_created }}</p>
            <p>Data modified: {{ file_data.date_modified }}</p>
            <form @submit.prevent='submitForm'>
                <label>Description:</label>
                <input class="form-control" type='description' name='description' v-model = 'description'>
                <button class="btn btn-warning" type='submit'>Change description</button>
            </form>
            <br>
            <button class="btn btn-primary btn-lg btn-block" @click='Download'>Download</button>
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
            console.log(localStorage.getItem('file_id'))
            axios
                .get('files/' + localStorage.getItem('file_id') + '/')
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
            axios
                .patch('files/' + localStorage.getItem('file_id') + '/', formData)
                .then(response => {
                    console.log(response)
                    alert('File description has changed.')
                    this.$router.push('/file_detail')
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
        },
        Download() {
            console.log('download start')

            axios
                .get('files/' + localStorage.getItem('file_id') + '/download/')
                .then(
                    response => {
                        console.log(response)
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                        alert(error)
                    }
                )

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
                        alert(error)
                    }
                )
            console.log('download finish')
        }
    }
}
</script>
