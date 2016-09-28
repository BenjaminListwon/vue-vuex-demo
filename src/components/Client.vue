<!-- 
The Client component and template have changed / grown quite
a bit since last time.

Of note in the template:
- clientId is now a reference to a local computed property, not
  the prop we used to pass in
- We've added a :class binding to toggle styles
- A few of the variable names have been cleaned up to make more 
  sense
-->
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

<!-- 
Lots to talk abou in the component spec. The major topics are
that most of the app business logic takes place in this component,
though using many different strategies.

In the blog post, we'll cover:
- mixins
- using methods vs computed props
- the watch observer versus mapping store.state
- the mounted lifecycle hook
- local storage
-->
<script>
// A mixin that encapsulates our use of local-storage
import { localStorageMixin } from '../mixins/local-storage-mixin'

// A mixin for message prep, will grow in examples to come
import { messageMixin } from '../mixins/message-mixin'

// Our shared state stuff, as usual
import { mapState, mapActions } from 'vuex'

export default {

  // Here's how to add mixins to a single-file vue component. Easier than
  // just about everything I've read online.
  mixins: [localStorageMixin, messageMixin],

  // Some local data that we don't need to share with other compnents
  // userMessage is the input v-model
  // alternateFont is a boolean we use to toggle our :class binding
  data () {
    return {
      userMessage: '',
      alternateFont: false
    }
  },

  // Almost identical to the previous version, but we moved clientId
  // into store.state for easy access
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
    clearUserMessage () {
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
      this.alternateFont = this.alternateFont ? false : true // eslint-disable-line no-unneeded-ternary
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

<!-- 
Styles for this component

The wacky flexbox stuff is to get the chat messages to align bottom
and scroll up.
-->
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
