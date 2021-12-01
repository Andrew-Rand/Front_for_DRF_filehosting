import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

const config = require('./config');

axios.defaults.baseURL = config.BaseUserUrl

createApp(App).use(store).use(router, axios).mount('#app')
