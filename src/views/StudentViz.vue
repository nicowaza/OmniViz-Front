<template>
  <v-container fill-height class="StdContainer">
    <v-layout align-center justify-center>
      <studentBtn />
    </v-layout>
  </v-container>
</template>

<script>

// import Header from '../components/Header.vue';
// import { mapGetters } from 'vuex';
// import router from '../router';
import StudentBtn from '../components/StudentBtn.vue';

export default {
  name: 'studentViz',
  components: {
    StudentBtn,
  },
  // ne marche pas ???
  // mounted() {
  //   if (!this.isLoggedIn) {
  //     return router.push('/login');
  //   }
  // },
  // ...mapGetters('authentication', [
  //   'isLoggedIn',
  // ]),
};
</script>

<style>
.StdContainer {
  height: 100vh;
}

@media (min-width: 600px) {
  .StdContainer {
    height: 95vh;
  }
}
</style>
