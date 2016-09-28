<template>
  <div>
    <header>
      <h2>{{ clientId }}</h2>
      <p><a href="#" @click="changeId">Change Id</a> | <a href="#" @click="changeFont">Change Font</a></p>
    </header>
    <div class="client" :class="{ 'alt-font': alternateFont }">
      <div class="msgwindow">
        <ul>
            <li v-for="message in getMessages()">
              <label>{{ message.sender }}:</label> {{ message.text }}
            </li>
        </ul>
      </div>
      <div class="msgbox">
        <input v-model="userMessage" placeholder="Enter a message, then hit [enter]" @keyup.enter="trySendMessage">
      </div>
    </div>
  </div>
</template>

<script>
import { localStorageMixin } from '../mixins/local-storage-mixin'
import { messageMixin } from '../mixins/message-mixin'
import { mapState, mapActions } from 'vuex'

export default {

  mixins: [localStorageMixin, messageMixin],

  data () {
    return {
      userMessage: '',
      alternateFont: false
    }
  },
  
  computed: {
    ...mapState({
      messages: ({messages}) => messages.items,
      clientId: state => state.clientId
    })
  },

  methods: {

    // Defining a method to return the collection of messages allows us to 
    // reverse the collection (which would violate mutation rules if done
    // in a computed property), so we can diplay the messages in reverse
    // order, like a chat window would.
    getMessages () {
      return this.messages.slice(0).reverse()
    },

    // Here we call this trySendMessage because ideally we'd try-catch the 
    // various operations, rolling back or retrying whenever something fails.
    trySendMessage () {

      // Our message payload
      let msg = this.bundleMessage(this.userMessage, this.clientId)

      // First, add the message to the store using the newMessage action
      this.newMessage(msg)

      // Next, push the message out (see below)
      this.ls_pushMessage(msg)

      // Finally, if all goes well, we reset the message box
      this.clearUserMessage()
    },

    // Simply empties the input for now
    clearUserMessage() {
      this.userMessage = ''
    },

    // This is what gets called when a new message is detected in the
    // browser's local storage. It will add it as a new message.
    handleRemoteMessage () {
      this.newMessage(this.ls_pullMessage())
    },

    // Silly prompt to let you change your clientId
    changeId () {
      let newId = window.prompt('What name would you like to use?', this.clientId)
      if (newId !== null && newId !== '') {
        this.setClientId(newId)
      }
    },

    // Toggle the alternate font class
    changeFont () {
      this.alternateFont = this.alternateFont ? false : true
    },

    // Set the page title to reflect changes in the clientId
    setPageTitle () {
      document.title = this.clientId + ' | Vuex Chat'
    },

    // Last but not least, map our vuex actions into this component
    ...mapActions(['newMessage', 'resetMessages', 'setClientId'])
  },

  // We'll use a watcher to observe when the clientId mapped property
  // changes, so the page title is always up to date.
  watch: {
    clientId () {
      this.setPageTitle()
    }
  },

  // Down here, once the client has been properly mounted in the app,
  // we use local-storage's .on() to monitor our message sharing key,
  // which will dispatch to our method defined above.
  mounted () {
    this.setClientId('Client-' + parseInt(100000 * Math.random()))
    this.ls_attachListener(this.handleRemoteMessage)
  }

}
</script>

<style scoped>
header span {
  color: #00f;
  font-size: 1rem;
  font-weight: normal;
}
.client {
  border: 1px solid #aaa;
  background: #fff;
  position: relative;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}
.client ul {
  list-style: none;
  padding: 1em;
  margin: 0;
  height: 300px;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
}
.client ul li {
  padding: 0.2em 0.5em;
}
.client ul li label {
  font-weight: 700;
}
.client .msgbox {
  border-top: 1px solid #ccc;
}
.client input {
  font-size: 15px;
  width: calc(100% - 2.5em);
  padding: 0.25em;
  margin: 1em;
}
.client.alt-font li,
.client.alt-font input {
  font-family: monospace;
}
</style>
