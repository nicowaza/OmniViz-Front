<template>
<div>
  <div v-for="room in rooms"
  :key="room.id"
  >
  <p>{{ room.name }} created by {{ room.authorID }}</p>
  <v-btn @click="join(room.name)">Join</v-btn></div>
</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default {
  name: 'roomsList',

  mounted() {
    this.fetchRooms();
  },
  computed: {
    ...mapState('rooms', [
      'rooms',
    ]),
    ...mapState('authentication', [
      'user',
    ]),
  },

  methods: {
    ...mapMutations('rooms', [
      'setRooms',
    ]),
    ...mapActions('rooms', [
      'fetchRooms',
    ]),
    join(name) {
      socket.emit('join', {
        // username: this.username,
        room: name,
        // description: this.room.description,
        // prof: this.room.authorID,
      });
      if (this.user.role === 'student') {
        this.$router.push('/student/viz');
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style>

</style>
