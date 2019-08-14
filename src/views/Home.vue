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
