import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Files from '../views/Files.vue'
import User from '../views/User.vue'
import ChangePassword from '../views/ChangePassword.vue'
import Upload from '../views/Upload.vue'

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
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/user/change_password',
    name: 'Change Password',
    component: ChangePassword
  },
  {
    path: '/files',
    name: 'Files',
    component: Files
  },
    {
    path: '/upload',
    name: 'Upload',
    component: Upload
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
