// Bring in our constants (those we need in this file)
import { NEW_MESSAGE, LOAD_MESSAGES } from '../mutation-constants'

// Initial state of our messages collection
// In practice, we'd have some initialization action, not a hardcoded message
const state = {
  items: [
    {
      text: 'Welcome to vuex chat!',
      sender: 'Vue.js'
    }
  ]
}

// Mutations are declared here in the messages module, and will act
// on the module's state, but be sure to have unique names because they
// are global to the entire Vue instance.
// http://vuex.vuejs.org/en/modules.html#namespacing
//
// To enforce uniquness (and make more legible code) we are using constants
// for the mutation names.
// Find out more at http://vuex.vuejs.org/en/mutations.html
//
// Our message mutations act on _this module's_ state, not the root state,
// as reflected by the paths in use below.
// More info at http://vuex.vuejs.org/en/modules.html#module-local-state
const mutations = {

  // Adds a message payload to store.state.messages.items
  [NEW_MESSAGE] (state, msg) {
    state.items.push(msg)
  },

  // Overwrites store.state.messages.items (for inits, etc)
  [LOAD_MESSAGES] (state, toLoad) {
    state.items = toLoad
  }
}

// Actions get registered in the global context, but for organizational
// purposes, we include them here for easier reading of this module.
//
// In practice, to avoid global collisions you might place these in a
// global actions.js file, but I find that harder to read. Instead, it
// might be better to come up with a naming convention that you adhere
// to for actions, getters, and namspaces for mutation constants.
const actions = {

  // Commits NEW_MESSAGE with the msg payload. We should add error
  // checking here to validate our message payload before committing.
  newMessage ({commit}, msg) {
    commit(NEW_MESSAGE, msg)
  },

  // Commits LOAD_MESSAGES with the toLoad payload. We could clean this
  // up by inspecting the payload to determine if we have a valid array,
  // or if we need to prep it before committing.
  loadMessages ({commit}, toLoad) {
    commit(LOAD_MESSAGES, toLoad)
  },

  // Provides component users with a way to "reset" the messages collection
  // without having to constantly worry about the implementation. Intternally
  // we just make use of LOAD_MESSAGES
  resetMessages ({commit}) {
    commit(LOAD_MESSAGES, [])
  }
}

export default {
  state,
  mutations,
  actions
}
