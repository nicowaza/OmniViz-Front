<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <p>{{ message.message }}</p>
    </div>
    <div v-for="room in roomInfos" :key="room.id">
      <p>{{ room.room }}</p>
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
    joiningEvent(data) {
      console.log(this);
      console.log('data :', data);
      this.messages.push(data);
    },
    roomCreation(data) {
      this.roomInfos.push(data);
    },
    greenTag(greenData) {
      console.log('greenTag :', greenData);
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
