<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import {
  mapState, mapGetters,
} from 'vuex';

export default {
  name: 'about',

  computed: {
    ...mapState('authentication', [
      'user',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
      'isConnected',
    ]),
  },
};


</script>

<style>

</style>
