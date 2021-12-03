import { createStore } from 'vuex'

export default createStore({
  state: {
    access: '',
    refresh: '',
    file_id: '',
    uploading: false,
  },
  mutations: {
    initializeStore(state) {
        if (localStorage.getItem('access')){
            state.access = localStorage.getItem('access')
            state.refresh = localStorage.getItem('refresh')
            state.file_id = localStorage.getItem('file_id')
            state.user_id = localStorage.getItem('user_id')
            state.uploading = localStorage.getItem('uploading')
            state.filelist = localStorage.getItem('filelist')
        } else {
            state.access = ''
            state.refresh = ''
            state.file_id = ''
            state.user_id = ''
            state.uploading = false
            state.filelist = []
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
    },
    setUploading(state, uploading){
        state.uploading = uploading
    },
    SetFilelist(state, filelist){
        state.filelist = filelist
    }
  },
  actions: {
  },
  modules: {
  }
})
