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
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Files',
    data() {
        return{
            file_data: [],
            id: '',
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
        Detail(id){
            axios
                .get('files/' + id + '/')
                .then(response => {
                    console.log(id)

                    const file_id = id
                    localStorage.setItem('file_id', file_id)
                    this.$store.commit('setFileId', file_id)

                    console.log(response)
                    this.$router.push('/file_detail');
                })
                .catch(error => {
                    console.log(error)
                    alert(error)
                })
        },
        Download(id) {
            console.log('download start')
            axios
                .get('files/' + id + '/download/')
                .then(response => {
                    console.log(response)
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
