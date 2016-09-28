<template>
  <div class="admin">
    <button @click="tryAdminMessage">Send Admin Message</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      sysmsg: [
        'Vue 2.0rc8 is out!',
        'Have you tried vue-router yet?',
        'Three cheers for Evan!'
      ],
      clientid: 'Vue.js'
    }
  },
  computed: {},
  methods: {

    tryAdminMessage() {
      var msg = this.sysmsg[Math.floor( Math.random() * this.sysmsg.length )]
      this.newMessage({
        text: msg, 
        sender: this.clientid
      })
    },
    ...mapActions(['newMessage'])
  }
}
</script>
