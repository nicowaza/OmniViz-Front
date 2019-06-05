<template>
  <div>
    <!-- <div v-for="message in messages" :key="message.id"><p>{{ message }}</p></div> -->
    <div v-for="welcome in welcomes" :key="welcome.id">
      <h1>{{ welcome.welcome }}</h1>
    </div>
    <div v-for="room in roomInfos" :key="room.id">
      <a>{{ room.room }} </a>
    </div>
  </div>
</template>

<script>
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

export default {
  name: 'TeacherDisplay',

  data() {
    return {
      messages: [],
      roomInfos: [],
      welcomes: [],
    };
  },
  sockets: {
    welcome(data) {
      this.welcomes.push(data);
    },
    joiningEvent(data) {
      this.messages.push(data);
      // console.log('hello :', data);
    },
    roomCreation(data) {
      this.roomInfos.push(data);
      // console.log('room infos', this.roomInfos);
    },
  },

  methods: {

  },
};
</script>

<style>
h1 {
  font-size: 3em;
}
</style>
