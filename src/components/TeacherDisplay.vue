<template>
  <div>
  <div v-for = "message in messages" :key="message.id"><p>{{ message.message }}</p></div>
  </div>
</template>

<script>
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default {
  name: 'TeacherDisplay',

  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    socket.on('joiningEvent', (data) => {
      this.messages.push(data);
      console.log('hello', data);
    });
  },

  methods: {

  },
};
</script>

<style>
h1 {
  font-size: 3em;
  background-color: beige;

}
</style>
