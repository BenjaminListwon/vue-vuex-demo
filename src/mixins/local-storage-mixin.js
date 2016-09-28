// This mixin provides a wrapper around the local-storage API
// for any compnent that wants to serialize data to and from the
// browser's local storage.
//
// More info on the API https://github.com/bevacqua/local-storage
// More info on mixins http://rc.vuejs.org/guide/mixins.html

import ls from 'local-storage'

export const localStorageMixin = {
  methods: {
    // Here we push a new message into the browser's local storage.
    //
    // In our app, we use this to broadcast a message from one client
    // to all the other "connected" clients.
    ls_pushMessage (msg) {
      ls.set('new-message', msg)
    },

    // Here we read a message off the browser's local storage.
    //
    // In our app, "connected" clients will use this to read the new
    // message from another client and add it to their own vuex store
    ls_pullMessage () {
      return ls.get('new-message')
    },

    // This is used to register callback functions that will be fired
    // when the state of the browser's local storage changes from another
    // tab or window. (Does not fire for changes in same process)
    //
    // In our app, the Client component registers a callback that will
    // use ls_pullMessage to fetch new messages initiated by other clients
    ls_attachListener (callback) {
      ls.on('new-message', callback)
    }
  }
}
