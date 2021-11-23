<template>
    <div class='container'>
        <h1>Upload files</h1>
    </div>
    	<div class="upload-videos">
        <div class="video-dropzone" ref="videodropzone">
            <div class="dropzone-display">
                <div class="p-5">
                    <br>
                    <h3>Drop or click here to upload your files</h3>
                    <br>
                </div>
            </div>
        </div>

        <uploading-video
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

import Resumable from './resumable.js'
import UploadingVideo from './UploadingHelper'

export default {
    components: {
        UploadingVideo
    },

    data(){
        return {
            files: [], // our local files array, we will pack in extra data to force reactivity
            r: false
        }
    },
    methods: {
        // finds the file in the local files array
        findFile(file){
            return this.files.find(item => item.file.uniqueIdentifier === file.uniqueIdentifier && item.status !== 'canceled') ?? {}
        },
        // cancel an individual file
        cancelFile(file){
            this.findFile(file).status = 'canceled'
            file.cancel()
        }
    },
    mounted(){
        // init resumablejs on mount
		this.r = new Resumable({
			target:'http://127.0.0.1:1338/api/files/chunk-upload/',
            maxChunkRetries: 1,
            chunkSize:50*1024*1024,
            simultaneousUploads:4,
            testChunks:true,
            throttleProgressCallbacks:1
		});
		// Resumable.js isn't supported, fall back on a different method
		if(!this.r.support) return alert('Your browser doesn\'t support chunked uploads. Get a better browser.');
        this.r.assignBrowse(this.$refs.videodropzone);
		this.r.assignDrop(this.$refs.videodropzone);
        // set up event listeners to feed into vues reactivity
        this.r.on('fileAdded', (file, event) => {
            file.hasUploaded = false
            console.log('this.files', this.files)
            // keep a list of files with some extra data that we can use as props
            this.files.push({
                file,
                status: 'uploading',
                progress: 0
            })
            this.r.upload()
        })
        this.r.on('fileSuccess', (file, event) => {
            this.findFile(file).status = 'success'

            delete axios.defaults.headers.common["Authorization"];
            axios({
                    url: 'http://127.0.0.1:1338/api/files/build/?' + 'resumableChunkNumber=1&resumableChunkSize=52428800&resumableCurrentChunkSize=52428800&resumableTotalSize=134217728&resumableType=text%2Fplain&resumableIdentifier=' +file.uniqueIdentifier+ '&resumableFilename=' +file.fileName+ '&resumableRelativePath=128_mb_file_text_new.txt&resumableTotalChunks=' + file.chunks.length  ,
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
        })
        this.r.on('fileError', (file, event) => {
            this.findFile(file).status = 'error'
        })
        this.r.on('fileRetry', (file, event) => {
            this.findFile(file).status = 'retrying'
        })
        this.r.on('fileProgress', (file) => {
            // console.log('fileProgress', progress)
            var localFile = this.findFile(file)
            // if we are doing multiple chunks we may get a lower progress number if one chunk response comes back early
            var progress = file.progress()
            if( progress > localFile.progress)
                localFile.progress = progress
        })



          XMLHttpRequest.prototype.open = (function(open) {
            return function(method,url,async) {
              open.apply(this,arguments);
              this.setRequestHeader('Authorization', localStorage.getItem('access'));
            };
          })(XMLHttpRequest.prototype.open);

    }
}


</script>

<style lang="scss">
.p-5 {
	padding: 3rem;
}
.upload-videos {
	display: flex;
	flex-direction: column;
}
.video-dropzone {
    height: 340px;
    width: 340px;
    padding: 16px;
	display: flex;
	align-self: center;
	margin-bottom: 1.2rem;
    cursor: pointer;
    * {
        pointer-events: none;
    }
    .dropzone-display {
        height: 100%;
        width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column	;
        border: 4px dashed #222;
        border-radius: 32px;
        img {
            width: 64px;
        }
		small {
			font-size: 0.65em;
			display: block;
		}
    }
}
</style>
