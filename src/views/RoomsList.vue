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
import {
  mapActions, mapMutations, mapState, mapGetters,
} from 'vuex';

// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

export default {
  name: 'roomsList',

  mounted() {
    this.fetchRooms();
    if (this.isLoggedIn) {
      this.$socket.open();
      console.log('user looged in', this.isLoggedIn);
    } else console.log('user logged ?', this.isLoggedIn);
  },

  computed: {
    ...mapState('rooms', [
      'rooms',
    ]),
    ...mapState('authentication', [
      'user',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
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
      this.$socket.emit('join', {
        // username: this.username,
        room: name,
        // description: this.room.description,
        // prof: this.room.authorID,
      });
      if (this.user) {
        if (this.user.role === 'student') {
          this.$router.push('/student/viz');
        } else {
          this.$router.push('/');
        }
      } else {
        alert('unauthorized: you are not authentified');
      }
    },
  },
};
</script>

<style>

</style>
