<!--
The Admin component is just a collection of silly functionality
to demonstrate how we make use of sharing vuex actions, use mutations
in different contexts, etc. As such, the template is very simple,
just some buttons bound to methods.
-->
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

<!--
Less complex than Client.vue, but makes use of the same mixins and
actions to demo their reuse.
-->
<script>
// A mixin that encapsulates our use of local-storage
import { localStorageMixin } from '../mixins/local-storage-mixin'

// A mixin for message prep, will grow in examples to come
import { messageMixin } from '../mixins/message-mixin'

// Our shared state stuff, as usual
import { mapActions } from 'vuex'

export default {

  // Here's how to add mixins to a single-file vue component. Easier than
  // just about everything I've read online.
  mixins: [localStorageMixin, messageMixin],

  // Just some local data we use to have fun with this component's buttons
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

      // This is the "clever" bit of this method. If broadcast is true, then
      // we use our local-storage mixins to push that message out for clients
      // to react to and render. Otherwise, it only pushes onto the local state
      // of the client in this window/tab.
      //
      // In the next evolution of our app here, we will instead use a real
      // (Feathers.js) messaging backend to broadcast to all connected clients.
      if (broadcast === true) {
        this.ls_pushMessage(msg)
      }
    },

    // Last but not least, map our store's actions into the component
    ...mapActions(['newMessage', 'resetMessages'])
  }
}
</script>

<!-- 
A few more scoped styles.
-->
<style scoped>
.admin {
  text-align: center;
}
button {
  font-family: 'Muli', Helvetica, sans-serif;
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