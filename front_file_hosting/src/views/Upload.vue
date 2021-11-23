<template>
    <div class='container'>
        <h1>Upload files</h1>
    </div>
    <div class='container'>
        <label>Open your file:</label>
        <input type='file' ref='file'><br><br>
        <label>Add description:</label>
        <input type='text' ref='description'>

        <uploading
            v-for="(file, index) in files"
            v-bind:key="file.file.uniqueIdentifier + index"
            :file="file.file"
            :status="file.status"
            :progress="file.progress"
            @cancel="cancelFile"
        />
    </div>
</template>

<script>
import axios from 'axios'
import CryptoJS from 'crypto-js'
import Resumable from './resumable.js'
import Uploading from './UploadingHelper'

export default {
    name: "ResumableUpload",
    components: {
        Uploading
    },
    data() {
        return {
            files: [],
            r: false,
            description: ''
        }
    },
    methods: {
        findFile(file) {
            return this.files.find(item => item.file.uniqueIdentifier === file.uniqueIdentifier && item.status !== 'canceled') ?? {}
        },
        cancelFile(file) {
            this.findFile(file).status = 'canceled'
        file.cancel()
        },
        resumableUpload() {
        this.r = new Resumable({
            target: 'http://127.0.0.1:1338/api/files/chunk-upload/',
            maxChunkRetries: 1,
            chunkSize: 50 * 1024 * 1024,
            simultaneousUploads: 4,
            testChunks: true,
            throttleProgressCallbacks: 1,
            query: {
                resumableHash: 'none',
                resumableDescription: 'none'
            }
        });
        this.r.assignBrowse(this.$refs.file);
        this.r.assignDrop(this.$refs.file);
        this.r.on('fileAdded', (file) => {
            try {

            if (file.size > 50 * 1024 * 1024) {
                file.hasUploaded = false
                this.files.push({
                    file,
                    status: 'uploading',
                    progress: 0
                })
                this.r.upload()
                } else {

                let formData = new FormData();
                formData.append('file', file.file)
                formData.append('total_size', file.size)
                formData.append('type', file.file.type)
                formData.append('filename', file.fileName)
                formData.append('description', this.$refs.description.value)

                delete axios.defaults.headers.common['Authorization'];
                let reader = new FileReader();
                reader.readAsBinaryString(file.file);
                reader.onload = function () {
                    let hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(reader.result));
                    let md5 = hash.toString();
                    formData.append('hash', md5);
                    console.log('file hash:' + md5)

                    axios.post('http://127.0.0.1:1338/api/files/file-upload/', formData)
                         .then(resp => {
                                console.log(resp.data)
                         })
                         .catch(e => {
                             let errorStatus = e.message.substr(e.message.length - 3);
                             if (errorStatus === '403') {
                             this.$router.push('/login')

                             } else {
                                console.log(errorStatus)
                             }
                         })
                };
                }
            } catch (error) {
                this.$router.push('/login')

            }
        })

        this.r.on('fileSuccess', (file) => {
            this.findFile(file).status = 'success'
            delete axios.defaults.headers.common['Authorization'];
            let description = this.$refs.description.value
            if (description === '') {
                description = 'None'}

            let reader = new FileReader();
                reader.readAsBinaryString(file.file);
                reader.onload = function () {
                    let hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(reader.result));
                    let md5 = hash.toString();
                    console.log('file hash:' + md5)


                    axios({
                      url: 'http://127.0.0.1:1338/api/files/build/?' + 'resumableChunkNumber=1&resumableChunkSize=52428800&resumableCurrentChunkSize=52428800&resumableTotalSize=134217728&resumableType=text%2Fplain&resumableIdentifier=' +file.uniqueIdentifier+ '&resumableFilename=' +file.fileName+ '&resumableRelativePath=128_mb_file_text_new.txt&resumableTotalChunks=' + file.chunks.length + '&resumableDescription=' + description + '&resumableHash=' + md5  ,
                      method: 'POST',
                    })
                            .then(response => {
                                    console.log(response)
                                }
                            )
                        .catch(
                            error => {
                              console.log(error)
                              alert(error)
                            }
                        )
                }
        })
        this.r.on('fileError', (file) => {
            this.findFile(file).status = 'error'
        })
        this.r.on('fileRetry', (file) => {
            this.findFile(file).status = 'retrying'
        })
        this.r.on('fileProgress', (file) => {
            var localFile = this.findFile(file)
            var progress = file.progress()
            if (progress > localFile.progress)
                localFile.progress = progress
        })
        XMLHttpRequest.prototype.open = (function (open) {
            return function () {
                open.apply(this, arguments);
                this.setRequestHeader('Authorization', localStorage.getItem('access'));
            };
        })(XMLHttpRequest.prototype.open);
        }
    },
    mounted() {
        this.resumableUpload()
    }
}
</script>
