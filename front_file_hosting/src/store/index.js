import { createStore } from 'vuex'

export default createStore({
  state: {
    access: '',
    refresh: '',
    file_id: '',
  },
  mutations: {
    initializeStore(state) {
        if (localStorage.getItem('access')){
            state.access = localStorage.getItem('access')
            state.refresh = localStorage.getItem('refresh')
            state.file_id = localStorage.getItem('file_id')
        } else {
            state.access = ''
            state.refresh = ''
            state.file_id = ''
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
    }
  },
  actions: {
  },
  modules: {
  }
})
