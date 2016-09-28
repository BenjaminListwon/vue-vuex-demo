export const messageMixin = {
  methods: {
    // Rather than make arrays all over, we just use this. Also, assures
    // all our messages will always have the same payload.
    bundleMessage (message = '', sender = 'Anonymous') {
      return { text: message, sender: sender }
    }
  }
}