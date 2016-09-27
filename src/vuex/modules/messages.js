// Initial state of our messages collection
const state = {
  items: [
    {
        text: "Welcome to vuex chat!", 
        sender: "Vue.js"
    }
  ]
}

// Mutations are declared here in the messages module, and will act
// on the module's state, but be sure to have unique names because they
// are global to the entire Vue instance. Better yet, use constants, like
// the second mutation does.
const mutations = {
  // Our new message mutation now acts on _this module's_ state, not the root
  // state, reflected in the path below.
  NEW_MESSAGE (state, msg) {
    state.items.push(msg)
  }
}

export default {
  state,
  mutations
}
