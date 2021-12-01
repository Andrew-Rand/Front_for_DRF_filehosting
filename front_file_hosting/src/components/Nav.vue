<template>
  <nav class="navbar navbar-expand-md mb-4 ul-right">
    <div v-if="show">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/login" class="nav-link active">LogIn</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link active btn btn-primary">SignUp</router-link>
        </li>
      </ul>
    </div>
    <div v-if="!show">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/user" class="nav-link active">Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/files" class="nav-link active">Files</router-link>
        </li>
        <li class="nav-item">
          <button class="btn btn-primary pe-3 me-3" @click="toUpload">Upload</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-dark me-3" @click="logout">LogOut</button>
        </li>


      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      show: this.checkIfIsLogged()
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      this.$store.commit('setAccess', '')
      this.$store.commit('setRefresh', '')
      this.show = this.checkIfIsLogged()
      this.$router.push('/login')
    },
    checkIfIsLogged() {
      let token = localStorage.getItem('access')
      if (token) {
        return false
      } else {
        return true
      }
    },
    toUpload() {
        window.location.href = '#/upload'
    }
  },
}
</script>

<style scoped>
.ul-right {
  display: flex;
  justify-content: end;
}

.nav-link {
  margin-right: 15px !important;
}
</style>