<template>
  <div >
    <div>
      <div style="display: flex; justify-content: space-around; width: 300px;">
        <div style="display: flex">
          <div style="width: 20px; height: 20px; background-color: green; margin-left: 10px"></div>
          <p style="margin-left: 3px"># {{ events.filter(x => x.tag=="green").length }}</p>
        </div>
        <div style="display: flex">
          <div style="width: 20px; height: 20px; background-color: red; margin-left: 10px"></div>
          <p style="margin-left: 3px;"># {{ events.filter(x => x.tag=="red").length }}</p>
        </div>
        <div style="display: flex">
          <div style="width: 20px; height: 20px; background-color: blue; margin-left: 10px"></div>
          <p style="margin-left: 3px;"># {{ events.filter(x => x.tag=="blue").length }}</p>
        </div>
        <div style="display: flex">
          <div style="width: 20px; height: 20px; background-color: yellow; margin-left: 10px"></div>
          <p style="margin-left: 3px;"># {{ events.filter(x => x.tag=="yellow").length }}</p>
        </div>
      </div>
    </div>
    <div v-for="room in roomInfos" :key="room.id">
      <p style="text-align: center;">You're logged in {{ room.room }}</p>
    </div>
    <div v-for="message in messages" :key="message.id">
      <p>{{ message.message }}</p>
    </div>
    <div v-if="alerts.includes('red')">alerte rouge</div>
    <ComposantAlerteRouge />
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
      alerts: [],
      events: [
        { tag: '', timestamp: '' },
      ],
    };
  },
  sockets: {
    joiningEvent(data) {
      // console.log(this);
      // console.log('data :', data);
      this.messages.push(data);
    },
    roomCreation(data) {
      this.roomInfos.push(data);
    },
    event(data) {
      this.events.push({ tag: data.color, timestamp: data.time });
      console.log(this.alertTags());
      if (this.alertTags()) {
        this.alertTags().forEach((color) => {
          this.alerts.push(color);
          this.events = this.events.filter(x => x.tag !== color);
        });
      }
    },
  },
  // },

  methods: {
    alertTags() {
      return ['green', 'yellow', 'red', 'blue'].filter(x => this.events.filter(y => Date.now() - y.timestamp < 30000).filter(y => y.tag === x).length > 5);
    },
  },
};
</script>

<style>
h1 {
  font-size: 3em;
}
</style>
