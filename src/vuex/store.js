import Vue from 'vue'
import Vuex from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
Vue.config.debug = debug

// Here's where we import the messages module
import messages from './modules/messages'

export default new Vuex.Store({

  state: {
    messages: []
  },

  actions: {
    newMessage ({commit}, msg) {
      commit('NEW_MESSAGE', msg)
    }
  },

  // We've moved the mutation out to the module
  mutations: {},

  // This is where the messages module gets added to the Vuex store
  modules: {
    messages
  },

  strict: debug

})
