<template>
<div style = "height: 100vh;">
  <div v-for="room in rooms"
  :key="room.id"
  >
  <p>{{ room.name }} created by {{ room.authorID }}</p>
  <v-btn @click="join(room.name, room.authorID)">Join</v-btn></div>
</div>
</template>

<script>

import {
  mapActions, mapMutations, mapState, mapGetters,
} from 'vuex';

export default {
  name: 'roomsList',

  data() {
    return {
      roomInfos: [],
    };
  },

  mounted() {
    this.fetchRooms();
    if (this.isConnected === false) {
      this.$socket.open();
      this.connect();
      console.log('opening socket');
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
      'isConnected',
    ]),
  },

  methods: {
    ...mapMutations('rooms', [
      'setRooms',
    ]),
    ...mapActions('rooms', [
      'fetchRooms',
      'connect',
    ]),
    join(name, authorID) {
      console.log('room name :', name);
      console.log('author :', authorID);

      this.$socket.emit('join', {
        room: name,
        createdBy: authorID,
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

    roomCreation(data) {
      console.log('room creation data', data);
      this.roomInfos.push(data);
    },
  },
};
</script>

<style>

</style>
