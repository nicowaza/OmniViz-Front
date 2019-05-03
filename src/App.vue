<template>
  <v-app >
    <div id="app">
      <Header/>
      <v-content class="pa-0 contentStyle">
        <div class="containerBtnStyle">
          <v-layout align-center justify-center>
            <router-view/>
          </v-layout>

        </div>

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
.containerBtnStyle {
  background-color: aquamarine;
  height: 100vh;
  width: 100vw;
  margin: auto;
}

@media (min-width: 600px) {
  .containerBtnStyle {
    width: 70vw;
  }
}

@media (min-width: 1020px) {
 .containerBtnStyle {
    width: 60vw;
  }
}

</style>
