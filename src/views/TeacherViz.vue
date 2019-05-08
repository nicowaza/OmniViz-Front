<template>
  <v-container fill-height>
    <v-layout  align-center justify-center>
      <TeacherDisplay />
    </v-layout>
  </v-container>

</template>

<script>
import TeacherDisplay from '../components/TeacherDisplay.vue';

export default {
  components: {
    TeacherDisplay,
  },
  name: 'Teacher',
};

</script>

<style>

</style>
