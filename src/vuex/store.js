import Vue from 'vue'
import Vuex from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
Vue.config.debug = debug

// Bring in our constants (that we need in this file)
import { SET_CLIENT_ID } from './mutation-constants'

// Here's where we import the messages module
import messages from './modules/messages'

export default new Vuex.Store({

  state: {
    clientId: null
  },

  actions: {
    setClientId ({commit, state}, id) {
      commit(SET_CLIENT_ID, id)
    }
  },

  getters: {
    getClientId: (state) => {
      return state.clientId
    }
  },

  // We've moved most of the mutations out to the module(s)
  mutations: {
    [SET_CLIENT_ID] (state, id) {
      state.clientId = id
    }
  },

  // This is where the messages module gets added to the Vuex store
  modules: {
    messages
  },

  strict: debug

})
