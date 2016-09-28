import Vue from 'vue'
import Vuex from 'vuex'

// Set a debug boolean flag
const debug = process.env.NODE_ENV !== 'production'

// Use vuex
Vue.use(Vuex)
Vue.config.debug = debug

// Bring in our constants (those we need in this file)
import { SET_CLIENT_ID } from './mutation-constants'

// Here's where we import the messages module
import messages from './modules/messages'

export default new Vuex.Store({

  // rootstate just contains our clientId
  state: {
    clientId: null
  },

  // An action to set the clientId
  actions: {
    setClientId ({commit, state}, id) {
      commit(SET_CLIENT_ID, id)
    }
  },

  // A getter for the clientId
  getters: {
    getClientId: (state) => {
      return state.clientId
    }
  },

  // We've moved most of the mutations out to the module(s). You can
  // learn more about namespace concerns, constants and more in the
  // messages module, the mutation-constants file or the blog post for
  // this demo.
  //
  // This mutation is commited by our setClientId action
  mutations: {
    [SET_CLIENT_ID] (state, id) {
      state.clientId = id
    }
  },

  // This is where the messages module gets added to the Vuex store
  modules: {
    messages
  },

  // Use strict mode?
  strict: debug

})
