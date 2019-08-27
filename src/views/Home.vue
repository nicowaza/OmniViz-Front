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
    // Square,
  },
  name: 'home',
  // components: {
  //   HelloWorld,
  // };
  mounted() {
    this.fetchRooms();
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
    display: flex;
    height: 100%;
  }
  h1 {
    font-size: 305%;
    color: map-get($colors, custom-ivory);
     margin: auto;
    text-align: center;
  }
</style>
