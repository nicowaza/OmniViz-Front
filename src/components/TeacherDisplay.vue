
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
      <p>{{ message }}</p>
    </div>
    <transition mode="in-out" name="animate" enter-active-class="animated flash" leave-active-class="animated flipOutX">
      <h3 v-if="alerts.includes('green')">alerte verte</h3>
    </transition>
    <transition mode="in-out" name="animate" enter-active-class="animated flash" leave-active-class="animated flipOutX">
      <h3 v-if="alerts.includes('red')">alerte rouge</h3>
    </transition>
    <br>
    <br>
    <br>
   <transition mode="out-in" name="heartBeat" enter-active-class="animated flash" leave-active-class="animated flipOutX">
      <h3 v-if="alerts.includes('blue')">alerte bleue</h3>
    </transition>
    <transition mode="out-in" name="heartBeat" enter-active-class="animated flash" leave-active-class="animated flipOutX">
      <h3 v-if="alerts.includes('yellow')">alerte jaune</h3>
    </transition>
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
      events: [],
      students: [],
    };
  },

  beforeDestroy() {
    this.$socket.close();
  },

  sockets: {
    // eslint-disable-next-line no-unused-expressions
    joiningEvent(data) {
      // console.log(this);
      console.log('data :', data);
      this.messages.push(data.message);
      this.students.push({
        username: data.username,
        id: data.user_id,
        role: data.user_role,
      });
    },
    leavingEvent(data) {
      // console.log(this);
      // const studentLeft = this.students.filter(student => student.id !== data.user_id);
      // console.log('student who left :', studentLeft);
      // console.log('leaving data :', data);
      this.messages.push(data.message);
      this.students = this.students.filter(student => student.id !== data.user_id);
    },
    roomCreation(data) {
      console.log('room creation data', data);
      this.roomInfos.push(data);
    },
    event(data) {
      this.events.push({ tag: data.color, timestamp: data.time });
      console.log('this alert tags()', this.alertTags());
      console.log('this alerts', this.alerts);
      console.log(data);
      // if (this.alertTags().length === 0) {
      //   this.alerts = [];
      // } else
      if (this.alertTags()) {
        this.alertTags().forEach((color) => {
          const { alerts } = this;
          alerts.push(color);
          function resetAlerts() {
            console.log('reset this alerts', alerts);
            console.log('setime out');
            alerts.splice(0, 1);
          }
          setTimeout(resetAlerts, 2000);
          // }
          this.events = this.events.filter(x => x.tag !== color);
        });
      }
    },
  },

  methods: {
    alertTags() {
      return ['green', 'yellow', 'red', 'blue'].filter(x => this.events.filter(y => Date.now() - y.timestamp < 30000).filter(y => y.tag === x).length > 4);
    },
  },
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
h1 {
  font-size: 3em;
}
</style>
