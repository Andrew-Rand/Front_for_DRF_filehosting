<template>
    <div class='container'>
        <div class="container text-center">
            <h3 class='wel_shad'>All your files</h3>
                <button class="btn btn-success" @click='DownloadAll'>Download ALL</button>
                <div class='container' v-for='(file, index) in file_data' :key='file.id'>
                    <br>
                    <h5>{{ file.name}}</h5>
                    <img width="75" height="75" class='me-3' :src="image[index]" />
                    <button class="btn btn-outline-success btn-lg btn-block me-3" @click='Download(file.id, file.name)'>Download</button>
                    <button class="btn btn-outline-warning me-3" @click='Detail(file.id)'>Detail</button>
                    <button class="btn btn-outline-danger" @click='Delete(file.id)'>Delete</button>
                    <br>
                </div>
                <br><br>
                <div class='container'>
                    <button class="btn btn-outline-info pag-but" @click='PreviousPage(file_data[0].id)'>Previous page</button>
                    <button class="btn btn-outline-info" @click='NextPage(file_data[0].id)'>Next page</button>
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

                        let tumb_array = []
                        let arrayLength = this.file_data.length;
                        for (var i = 0; i < arrayLength; i++) {
                            let file_name = this.file_data[i].name
                            let string_array = file_name.split('.')
                            tumb_array.push(config.FileStorageUrl + localStorage.getItem('user_id') + '/' + string_array[0] + '_tumbnail' + '.png')
                            console.log(tumb_array)
                            //Do something
                        }

                        this.image = tumb_array

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
        Download(id, name) {
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
                    fileLink.setAttribute('download', name);
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
        },
        Delete(id) {
            let result = confirm('Do you really want to delete your file?')
            if (result === true) {
            axios({
                    url: config.BaseFileUrl + id + '/',
                    method: 'DELETE',
                })
                .then(response => {
                    console.log(response)
                    this.$forceUpdate();
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
.pag-but {
margin-right: 10vw;
}
.wel_shad{
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3)
}
</style>