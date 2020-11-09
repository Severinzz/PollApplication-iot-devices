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
.app-container{
  display: flex;
  justify-content: center;
}
.route-view {
  margin: 10vh auto auto auto;
  width: 90vh
}
</style>
