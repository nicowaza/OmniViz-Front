<template>
  <div class="about">
    <h1>This is the welcome page</h1>
    <div style="display: flex; justify-content: space-around;">
      <RedBtn />
      <BlueBtn />
    </div>
  </div>
</template>

<script>
import {
  mapState, mapGetters,
} from 'vuex';
import RedBtn from '../components/RedButton.vue';
import BlueBtn from '../components/BlueButton.vue';

export default {
  name: 'about',

  components: {
    RedBtn,
    BlueBtn,
  },

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
