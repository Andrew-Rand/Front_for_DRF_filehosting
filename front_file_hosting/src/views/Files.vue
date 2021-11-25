<template>
    <div class='container'>
        <div class="container">
            <h3>All your files</h3>
                <button class="btn btn-success" @click='DownloadAll'>Download ALL</button>
                <div class='container' v-for='file in file_data' :key='file.id'>
                    <br>
                    <h4>{{ file.name}}</h4>
                    <button class="btn btn-primary btn-lg btn-block" @click='Download(file.id)'>Download</button>
                    <button class="btn btn-warning" @click='Detail(file.id)'>Detail</button>
                    <br>
                </div>
                <br><br>
                <div class='container'>
                    <button class="btn btn-info" @click='PreviousPage(file_data[0].id)'>Previous page</button>
                    <button class="btn btn-info" @click='NextPage(file_data[0].id)'>Next page</button>
                </div>
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
            file_data: [],
            id: '',
            pageNumber: 1,
        }
    },
    mounted() {
        this.getMe()
    },
    methods: {
        getMe() {

            axios({
                    url: config.BaseFileUrl + '/?page=' + this.pageNumber,
                    method: 'GET',
                })
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
        Detail(id){
            axios({
                    url: config.BaseFileUrl + id + '/',
                    method: 'GET',
                })
                .then(response => {
                    console.log(id)

                    localStorage.setItem('file_id', id)
                    this.$store.commit('setFileId', id)

                    console.log(response)
                    this.$router.push('/file-detail');
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
        },
        Download(id) {
            console.log('download start')
            axios({
                    url: config.BaseFileUrl + id + '/download/',
                    method: 'GET',
                    responseType: 'blob',
                })
                .then(response => {
                    console.log(response)
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');
                    var type = response.headers['content-type']
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'file' + type);
                    document.body.appendChild(fileLink);
                    fileLink.click();
                    
                    this.$router.push('/files')
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
                console.log('download finish')
        },
        DownloadAll() {
            console.log('download start')

            axios({
                    url: config.BaseFileUrl + 'download/',
                    method: 'GET',
                    responseType: 'blob',
                })
                .then(response => {
                    console.log(response)
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'your_archive.zip');
                    document.body.appendChild(fileLink);
                    fileLink.click();

                    this.$router.push('/files')
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
                console.log('download finish')
        },
        NextPage(id) {
            console.log(id)
            this.pageNumber++;
            console.log(this.pageNumber)
            axios({
                    url: config.BaseFileUrl + '/?page=' + this.pageNumber,
                    method: 'GET',
                })
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
        PreviousPage(id) {
            console.log(id)
            this.pageNumber--;
            console.log(this.pageNumber)
            axios({
                    url: config.BaseFileUrl + '/?page=' + this.pageNumber,
                    method: 'GET',
                })
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
        }
    }
}
</script>
