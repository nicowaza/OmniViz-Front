<template>
  <v-container fill-height class="StdContainer">
    <v-layout align-center justify-center>
      <studentBtn />
    </v-layout>
  </v-container>
</template>

<script>

// import Header from '../components/Header.vue';
import StudentBtn from '../components/StudentBtn.vue';

export default {
  components: {
    StudentBtn,
  },
  name: 'studentViz',
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
