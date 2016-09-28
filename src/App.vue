<template>
  <div id="app">
    <header>
      <h1>Vuex Chat</h1>
      <p><a href="https://benjaminlistwon.com/blog/data-flow-in-vue-and-vuex/">Read the article</a></p>
    </header>
    <div class="row">
      <div class="col">
        <client></client>
      </div>
    </div>
    <admin></admin>
  </div>
</template>

<script>
import Client from './components/Client.vue'
import Admin from './components/Admin.vue'

export default {
  components: {
    Client,
    Admin
  }
}
</script>

<!-- From here on down, just styles, nothing to do with the functionality. -->
<style>
body {
  font-family: Helvetica, sans-serif;
  background: #f6f6f6;
}
header {
  text-align: center;
}
h1, h2, h3 {
  padding: 0;
  margin: 0;
}
#app>header h1 {
  font-size: 2rem;
  line-height: 2rem;
}
#app>header p {

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
