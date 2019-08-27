<template>
  <div >
    <div class="home">
      <h1>Welcome to Omnilive</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
// import Square from '../components/btn.vue'
import {
  mapActions, mapMutations, mapState,
} from 'vuex';

export default {
  components: {

  },
  name: 'home',

  mounted() {
    this.fetchRooms()
      .then(() => {
        console.log('after fetch');
        console.log('this rooms:', this.rooms);
      });
  },

  computed: {
    ...mapState('rooms', [
      'rooms',
    ]),
  },
  methods: {
    ...mapMutations('rooms', [
      'setRooms',
    ]),
    ...mapActions('rooms', [
      'fetchRooms',
    ]),
  },
};
</script>

<style scoped lang="scss">
  .home {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -222px;
  }
  h1 {
    font-size: 50px;
    color: map-get($colors, custom-ivory);
  }
</style>
