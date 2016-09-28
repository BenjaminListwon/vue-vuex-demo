<template>
  <div>
    <h1>{{ clientid }}</h1>
    <div class="client">
      <div class="msgwindow">
        <ul>
            <li v-for="message in getMessages()">
              <label>{{ message.sender }}:</label> {{ message.text }}
            </li>
        </ul>
      </div>
      <div class="msgbox">
        <input v-model="msg" placeholder="Enter a message, then hit [enter]" @keyup.enter="trySendMessage">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      msg: ''
    }
  },
  props: ['clientid'],
  computed: {
    ...mapState({
      messages: ({messages}) => messages.items
    })
  },
  methods: {
    getMessages() {
      return this.messages.slice(0).reverse()
    },
    trySendMessage() { 
      this.newMessage({
        text: this.msg, 
        sender: this.clientid
      })
      this.resetMessage()
    },
    resetMessage() {
      this.msg = ''
    },
    ...mapActions(['newMessage'])
  }
}
</script>
