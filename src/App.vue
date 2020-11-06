<template>
  <v-app>
    <div class="app-container">
      <div class="route-view">
        <router-view/>
      </div>
    </div>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.app-container{
  flex-direction: column;
  display: flex;
  height: 97vh;
}
.header{
  max-height: 112px;
}
.route-view{
  flex: 1 0 auto;
}
.footer{
  flex-shrink: 0;
  margin-bottom: -1.2%;
}
</style>
