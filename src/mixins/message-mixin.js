// This mixin provides message related methods to any component
// that needs to send or receive messages
//
// More info on mixins http://rc.vuejs.org/guide/mixins.html

export const messageMixin = {
  methods: {
    // Rather than make arrays all over, we just use this. Also, assures
    // all our messages will always have the same payload.
    bundleMessage (message = '', sender = 'Anonymous') {
      return { text: message, sender: sender }
    }
  }
}
