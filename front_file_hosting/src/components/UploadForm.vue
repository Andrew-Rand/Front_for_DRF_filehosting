<template>
    <div v-if="show" class="input-group input-group-lg">
        <input class="form-control blink_me" type='file' ref='file'>
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