<template>
  <div id="app">
    <header>
      <h1>Vue: Sharing Data Using Vuex</h1>
      <p><a href="https://benjaminlistwon.com/blog/data-flow-in-vue-and-vuex/">Read the article</a></p>
    </header>
    <div class="row">
      <div class="col">
        <client clientid="Client A"></client>
      </div>
      <div class="col">
        <client clientid="Client B"></client>
      </div>
    </div>
    <admin></admin>
    <button @click="temp = 'cats'">click</button>
  </div>
</template>

<script>
import ls from 'local-storage'

import Client from './components/Client.vue'
import Admin from './components/Admin.vue'

import { mapState } from 'vuex'

export default {
  components: {
    Client,
    Admin
  },
  data() {
    return {
      temp: 'TEMP'
    }
  },
  computed: {
    ...mapState({
      messages: ({messages}) => messages.items
    })
  },
  watch: {
    messages() {
      ls.set('messages', this.messages)
    }
  },
  mounted() {
    ls.on('messages', function() { console.log(ls.get('messages')); } );
  }
}
</script>

<!-- From here on down, just styles, nothing to do with the functionality. -->
<style>
body {
  font-family: Helvetica, sans-serif;
}
header {
  text-align: center;
}
.row {
	display: table;
	width: 100%;
}
.col {
	display: table-cell;
	vertical-align: top;
	padding: 2em;
}
.client {
	border: 1px solid #ccc;
	background: #fff;
  position: relative;
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
</style>
