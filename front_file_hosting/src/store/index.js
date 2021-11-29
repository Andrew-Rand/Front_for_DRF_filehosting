import { createStore } from 'vuex'

export default createStore({
  state: {
    access: '',
    refresh: '',
    file_id: '',
    user_id: '',
  },
  mutations: {
    initializeStore(state) {
        if (localStorage.getItem('access')){
            state.access = localStorage.getItem('access')
            state.refresh = localStorage.getItem('refresh')
            state.file_id = localStorage.getItem('file_id')
            state.user_id = localStorage.getItem('user_id')
        } else {
            state.access = ''
            state.refresh = ''
            state.file_id = ''
            state.user_id = ''
        }
    },
    setAccess(state, access) {
        state.access = access
    },
    setRefresh(state, refresh) {
        state.refresh = refresh
    },
    setFileId(state, file_id) {
        state.file_id = file_id
    },
    setUserId(state, user_id) {
        state.user_id = user_id
    }
  },
  actions: {
  },
  modules: {
  }
})
