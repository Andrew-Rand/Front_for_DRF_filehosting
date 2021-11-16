import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Files from '../views/Files.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Sign up',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Log in',
    component: LogIn
  },
  {
    path: '/files',
    name: 'Files',
    component: Files
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
