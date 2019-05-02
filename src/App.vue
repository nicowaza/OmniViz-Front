<template>
  <v-app >
    <div id="app">
      <Header/>
      <v-content class="pa-0 contentStyle">
        <v-container fill-height class="background_color">
          <v-layout align-center justify-center>
            <router-view/>
          </v-layout>

        </v-container>

      </v-content>
      <BottomNav class="hidden-sm-and-up"/>
      </div>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import BottomNav from './components/BottomNav.vue';

export default {
  components: {
    Header,
    BottomNav,
  },
};
</script>

<style lang="scss">
.contentStyle {
  height: 100vh;
  background-color: black;
}
.background_color {
  background-color: aquamarine;
}

</style>
