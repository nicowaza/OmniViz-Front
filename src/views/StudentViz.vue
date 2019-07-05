<template>
  <v-container fill-height class="StdContainer">
    <v-layout align-center justify-center>
      <studentBtn />
    </v-layout>
  </v-container>
</template>

<script>

import StudentBtn from '../components/StudentBtn.vue';

export default {
  name: 'studentViz',
  components: {
    StudentBtn,
  },
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
