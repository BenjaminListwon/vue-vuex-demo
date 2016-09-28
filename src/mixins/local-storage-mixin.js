import ls from 'local-storage'

export const localStorageMixin = {
  methods: {
    // Here we push a new message into the browser's local storage, 
    // where other "connected" clients will detect the change and add 
    // it to their own store.state.messages
    ls_pushMessage (msg) {
      ls.set('new-message', msg)
    },

    // This is what gets called when a new message is detected in the
    // browser's local storage. It will add it as a new message.
    ls_pullMessage () {
      return ls.get('new-message')
    },

    // This is used selectively for components that want to listen for
    // new messages and handle the result
    ls_attachListener (callback) {
      ls.on('new-message', callback)
    }
  }
}