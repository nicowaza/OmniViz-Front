<template>
  <v-app >
    <HeaderBar/>
    <div id="app" class="pa-0 contentStyle">
      <router-view class="containerMain"/>
    </div>
    <BottomNav class="hidden-sm-and-up"/>
  </v-app>
</template>

<script>
import HeaderBar from './components/Header.vue';
import BottomNav from './components/BottomNav.vue';

export default {
  components: {
    HeaderBar,
    BottomNav,
  },
};
</script>

<style lang="scss">
#app {
  margin-top: 32px;
}
.contentStyle {
  height: 100vh;
  background-color: black;
}
.containerMain {
  background-color: aquamarine;
  height: 100vh;
  width: 100vw;
  margin: auto;
}

@media (min-width: 600px) {
  .containerMain {
    width: 70vw;
  }
}

@media (min-width: 900px) {
 .containerMain {
    width: 60vw;
  }
}

</style>
