<template>
  <div class="home">
    <!-- <Square/> -->
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
    console.log('home mounted rooms', this.rooms);
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
