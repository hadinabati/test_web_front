import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import base from 'src/store/base'


export default store(function () {
  const Store = createStore({
    modules: {
      base
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
