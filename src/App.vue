<!-- 
This is the main app template that simply organizes the other
components on the page visually. There is no functionality here.

Of note, the clientid prop was removed, as the Client component
now handles that internally. 
-->
<template>
  <div id="app">
    <header>
      <h1>Vuex Chat</h1>
      <p><a :href="url" target="_blank" rel="noopener">Add New Client</a> | <a href="https://benjaminlistwon.com/blog/vuex-chat-part-2/">Read the article</a></p>
    </header>
    <div class="row">
      <div class="col">
        <client></client>
      </div>
    </div>
    <admin></admin>
  </div>
</template>

<!-- 
Not much new going on here, just a new component in use.
-->
<script>
import Client from './components/Client.vue'
import Admin from './components/Admin.vue'

export default {
  // We've added a component here, Admin, which basically demos some
  // reuse of shared actions in another context. See the component for
  // more info
  components: {
    Client,
    Admin
  },

  // All we've got here is a simple property so we can spawn new
  // "clients" easily in your local environment, if you snag the code
  // IOW, irrelevant to the topic at hand :-)
  computed: {
    url () {
      return document.location
    }
  }
}
</script>

<!-- 
From here on down, just styles, nothing to do with the functionality.

One note, you can have multiple style declarations here. In this case
we have one for global styles, and one that is scoped to this component.
-->
<style>
body {
  font-family: 'Muli', Helvetica, sans-serif;
  background: #f6f6f6;
  margin: 0;
  padding: 0;
}
header {
  text-align: center;
}
a {
  color: #36c;
  text-decoration: none;
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
</style>

<style scoped>
header {
  background: #fff;
  padding: 1rem;
  box-shadow: inset 0 -5px 5px rgba(0,0,0,0.1);
  border-bottom: 1px solid #ddd;
}
header h1 {
  font-size: 2rem;
  line-height: 2rem;
}
</style>
