<template>

    <Nav/>

    <div class='container'>
        <div class="container text-center p-2">
            <button class="btn btn-outline-primary btn-lg me-5" @click='DownloadAll'>Download ALL</button>
            <button class="btn btn-primary btn-lg" @click='toUpload'>Upload new file</button>
                <br><br>
            <div class="row">

            <div class='col-md-auto'>
            <h5><a style="cursor:pointer" @click='orderBy("name")'>order by name</a></h5>
            </div>
            <div class="col-auto">
                 <img style="cursor:pointer" width="20" height="20" src="../assets/arrow_up.png" @click='orderBy("name")' alt="detail"/>
            </div>
            <div class="col-auto">
                 <img style="cursor:pointer" width="20" height="20" src="../assets/arrow_down.png" @click='orderBy("-name")' alt="detail"/>
            </div>

            <div class='col-md-auto'>
            <h5><a style="cursor:pointer" @click='orderBy("date_modified")'>     order by date</a></h5>
            </div>
            <div class="col-auto">
                 <img style="cursor:pointer" width="20" height="20" src="../assets/arrow_up.png" @click='orderBy("date_modified")' alt="detail"/>
            </div>
            <div class="col-auto">
                 <img style="cursor:pointer" width="20" height="20" src="../assets/arrow_down.png" @click='orderBy("-date_modified")' alt="detail"/>
            </div>

            </div>
                <br>

            <div class='container' v-for='(file, index) in file_data' :key='file.id'>


                <div class="row border rounded-3">
                    <div class="col-auto">
                        <img style="cursor:pointer" width="75" height="75" class='me-3' :src="image[index]" @click='Detail(file.id)'/>
                    </div>
                    <div class="col-md">
                        <p style="margin:0">{{ file.name}}</p>
                    </div>
                    <div class="col-auto">
                        <img style="cursor:pointer" width="50" height="50" src="../assets/about.png" @click='Detail(file.id)' alt="detail"/>
                    </div>
                    <div class="col-auto">
                        <img style="cursor:pointer" width="50" height="50" src="../assets/download.png" @click='Download(file.id, file.name)' alt="download" />
                    </div>
                    <div class="col-auto">
                        <img style="cursor:pointer" width="50" height="50" src="../assets/delete.png" @click='Delete(file.id)' alt="delete"/>
                    </div>
                </div>
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
import Nav from "../components/Nav.vue"

const config = require('../config');

export default {
    name: 'Files',
        components: {
        Nav
    },
    data() {
        return{
            file_data: [],
            id: '',
            pageNumber: 1,
            orderW: '',
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

                        let filelist = response.data.data.result

                        localStorage.setItem('filelist', JSON.stringify(filelist))

                        this.$store.commit('SetFilelist', filelist)

                        this.file_data = JSON.parse(localStorage.getItem('filelist'))

                        let tumb_array = []
                        let arrayLength = this.file_data.length;
                        for (var i = 0; i < arrayLength; i++) {
                            let file_name = this.file_data[i].name
                            let string_array = file_name.split('.')
                            tumb_array.push(config.FileStorageUrl + 'tumbs/' + localStorage.getItem('user_id') + '/' + string_array[0] + '_tumbnail' + '.png')
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

                        let filelist = response.data.data.result

                        localStorage.setItem('filelist', JSON.stringify(filelist))

                        this.$store.commit('SetFilelist', filelist)

                        this.file_data = JSON.parse(localStorage.getItem('filelist'))

                        let tumb_array = []
                        let arrayLength = this.file_data.length;
                        for (var i = 0; i < arrayLength; i++) {
                            let file_name = this.file_data[i].name
                            let string_array = file_name.split('.')
                            tumb_array.push(config.FileStorageUrl + 'tumbs/' + localStorage.getItem('user_id') + '/' + string_array[0] + '_tumbnail' + '.png')
                            console.log(tumb_array)
                            //Do something
                        }

                        this.image = tumb_array
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                        this.pageNumber--
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

                        let filelist = response.data.data.result

                        localStorage.setItem('filelist', JSON.stringify(filelist))

                        this.$store.commit('SetFilelist', filelist)

                        this.file_data = JSON.parse(localStorage.getItem('filelist'))

                        let tumb_array = []
                        let arrayLength = this.file_data.length;
                        for (var i = 0; i < arrayLength; i++) {
                            let file_name = this.file_data[i].name
                            let string_array = file_name.split('.')
                            tumb_array.push(config.FileStorageUrl + 'tumbs/' + localStorage.getItem('user_id') + '/' + string_array[0] + '_tumbnail' + '.png')
                            console.log(tumb_array)
                            //Do something
                        }

                        this.image = tumb_array

                    }
                )
                .catch(
                    error => {
                        console.log(error)
                        this.pageNumber++
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
                    this.$router.push('/files')

                    axios({
                    url: config.BaseFileUrl + '/?page=' + this.pageNumber,
                    method: 'GET',
                    })
                    .then(
                        response => {
                        console.log(response)

                        let filelist = response.data.data.result

                        localStorage.setItem('filelist', JSON.stringify(filelist))

                        this.$store.commit('SetFilelist', filelist)

                        this.file_data = JSON.parse(localStorage.getItem('filelist'))

                        let tumb_array = []
                        let arrayLength = this.file_data.length;
                        for (var i = 0; i < arrayLength; i++) {
                            let file_name = this.file_data[i].name
                            let string_array = file_name.split('.')
                            tumb_array.push(config.FileStorageUrl + 'tumbs/' + localStorage.getItem('user_id') + '/' + string_array[0] + '_tumbnail' + '.png')
                            console.log(tumb_array)
                            //Do something
                        }

                        this.image = tumb_array

                    }
                )
                .catch(
                    error => {
                        console.log(error)
                        this.pageNumber++
                    }
                )


                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
            } else {
                console.log('You save your file')
            }

        },
        toUpload() {
            window.location.href = '#/upload'
        },
        orderBy(name) {

                this.orderW = name
                    axios({
                    url: config.BaseFileUrl + '/?page=' + this.pageNumber + '&ordering=' + this.orderW,
                    method: 'GET',
                })
                .then(
                    response => {
                        console.log(response)

                        let filelist = response.data.data.result

                        localStorage.setItem('filelist', JSON.stringify(filelist))

                        this.$store.commit('SetFilelist', filelist)

                        this.file_data = JSON.parse(localStorage.getItem('filelist'))

                        let tumb_array = []
                        let arrayLength = this.file_data.length;
                        for (var i = 0; i < arrayLength; i++) {
                            let file_name = this.file_data[i].name
                            let string_array = file_name.split('.')
                            tumb_array.push(config.FileStorageUrl + 'tumbs/' + localStorage.getItem('user_id') + '/' + string_array[0] + '_tumbnail' + '.png')
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

.col-md {
display: flex;
justify-content: center;
align-items: center;
}

.col-auto {
display:flex;
justify-content: center;
align-items: center;
}

</style>