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
  height: auto;
  min-height: 300px;
  // margin-top: 28px;
}
.contentStyle {
  // height: 100vh;
  background-color: black;
}
.containerMain {
  background-color: aquamarine;
  height: auto;
  width: 100vw;
  margin: auto;
  padding-top: 64px;
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
