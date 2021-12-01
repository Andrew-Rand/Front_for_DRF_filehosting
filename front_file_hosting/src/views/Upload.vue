<template>

    <Nav/>

    <div class='container pad'>
        <h2 class='text-center'>Upload files</h2>
    </div>
    <div class='container pad'>
        <br>
        <label class="text-primary">Add description:</label>
        <input class="form-control" type='text' ref='description'><br>
        <label>Upload your file:</label>
        <div class="input-group input-group-lg">
            <input class="form-control blink_me" type='file' ref='file'>
        </div>
        <br>
        <br>


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
import Nav from "../components/Nav.vue"
import CryptoJS from 'crypto-js'
import Resumable from './resumable.js'
import Uploading from './UploadingHelper'
const config = require('../config');


export default {
    name: "ResumableUpload",
    components: {
        Uploading,
        Nav,
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
            target: config.BaseFileUrl + 'chunk-upload/',
            maxChunkRetries: 1,
            chunkSize: config.ChunkSize,
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

            if (file.size > config.ChunkSize) {
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


                let reader = new FileReader();
                reader.readAsBinaryString(file.file);
                reader.onload = function () {
                    let hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(reader.result));
                    let md5 = hash.toString();
                    formData.append('hash', md5);
                    console.log('file hash:' + md5)

                    axios.post(config.BaseFileUrl + 'file-upload/', formData)
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

            let description = this.$refs.description.value
            if (description === '') {
                description = 'None'}
            if (file.size > config.SmallFileLimit) {
                let toRead = new Blob([file.file.slice(0, config.HashFirstSlice), file.file.slice(config.HashSecondSlice)])
            } else {
                let toRead = file.file
            }

            let reader = new FileReader();
                reader.readAsBinaryString(file.file);
                reader.onload = function () {
                    let hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(reader.result));
                    let md5 = hash.toString();
                    console.log('file hash:' + md5)


                    axios({
                      url: config.BaseFileUrl + 'build/?' + 'resumableChunkNumber=1&resumableChunkSize=52428800&resumableCurrentChunkSize=52428800&resumableTotalSize=' + file.size + '&resumableType=text%2Fplain&resumableIdentifier=' +file.uniqueIdentifier+ '&resumableFilename=' +file.fileName+ '&resumableRelativePath=128_mb_file_text_new.txt&resumableTotalChunks=' + file.chunks.length + '&resumableDescription=' + description + '&resumableHash=' + md5  ,
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
        }
    },
    mounted() {
        this.resumableUpload()
    }
}
</script>

<style>


.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

</style>