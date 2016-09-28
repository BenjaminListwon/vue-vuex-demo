<template>
  <div class="admin">
    <header>
      <h2>Admin Controls</h2>
    </header>
    <p>
      <button @click="tryAdminMessage(true)">Message All</button>
      <button @click="tryAdminMessage">Message This Client</button>
      <button @click="resetMessages">Clear Client Messages</button>
    </p>
  </div>
</template>

<script>
import { localStorageMixin } from '../mixins/local-storage-mixin'
import { messageMixin } from '../mixins/message-mixin'
import { mapActions } from 'vuex'

export default {

  mixins: [localStorageMixin, messageMixin],

  data () {
    return {
      sysmsg: [
        'Vue 2.0rc8 is out!',
        'Have you tried vue-router yet?',
        'Three cheers for Evan!'
      ],
      adminId: 'Vue.js'
    }
  },
  computed: {},
  methods: {

    // Here we call this tryAdminMessage because ideally we'd try-catch the 
    // various operations, rolling back or retrying whenever something fails.
    tryAdminMessage (broadcast = false) {

      // Make a random choice, for fun
      let randomMessage = this.sysmsg[Math.floor(Math.random() * this.sysmsg.length)]

      // Our message payload
      let msg = this.bundleMessage(randomMessage, this.adminId)

      // Add the message to the store using the newMessage action
      this.newMessage(msg)

      // Push the message out
      if (broadcast === true) {
        this.ls_pushMessage(msg)
      }
    },

    // Last but not least, map our store's actions into the component
    ...mapActions(['newMessage', 'resetMessages'])
  }
}
</script>

<style scoped>
.admin {
  text-align: center;
}
button {
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
  margin: 0.5rem;
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 3px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  outline: none;
}
button:active {
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
</style>