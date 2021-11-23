<template>
    <div class="container">
        <h1>Upload small files</h1>
        <br>
         <form @submit.prevent='submitForm'>
             <label>Open your file:</label>
             <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/><br>
             <label>Add description:</label>
             <input class="form-control" type='text' name='description' v-model = 'description'> <br>
             <button class="btn btn-success" v-on:click="submitFile()">Upload file to server</button>
        </form>
    </div>
</template>


<script>
import axios from 'axios'
const config = require('../config');

export default {
    name: 'NonChunkUpload',
    data() {
        return {
            'file': '',
            'description': '',
        }
    },
    methods: {
        submitFile(){
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('description', this.description);
            axios
                .post(config.BaseFileUrl + 'file-upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              })
                .then(response => {
                    console.log(response)
                    this.$router.push('/files')
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
        },
        handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
}
</script>
