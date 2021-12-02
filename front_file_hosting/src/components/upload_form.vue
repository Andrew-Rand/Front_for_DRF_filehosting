<template>
    <div class='container pad'>
        <br>
        <div v-if="show">
            <label class="text-primary">Add description:</label>
            <input class="form-control" type='text' ref='description'><br>
            <label>Upload your file:</label>
            <div class="input-group input-group-lg">
                <input class="form-control blink_me" type='file' ref='file'>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "UploadForm",
  data() {
    return {
      show: this.checkIfUploading()
    }
  },
  methods: {
    checkIfUploading() {
      let uploading = localStorage.getItem('uploading')
      if (uploading) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>