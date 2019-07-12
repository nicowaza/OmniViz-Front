
<template>
<div style="height: 100%">
  <v-btn color="red" style="right: -80%" @click="closeRoom()">Fermer le cours</v-btn>
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
    <!-- <div v-for="room in roomInfos" :key="room.id">
      <p style="text-align: center;">You're logged in {{ room.room }}</p>
    </div> -->
    <div v-for="message in messages" :key="message.id">
      <p>{{ message }}</p>
    </div>
    <div style="min-width: 600px">
      <transition mode="in-out" name="animate" enter-active-class="animated flash" leave-active-class="animated flipOutX">
        <h3 v-show="alerts.includes('green')">alerte verte</h3>
      </transition>
      <transition mode="in-out" name="animate" enter-active-class="animated flash" leave-active-class="animated flipOutX">
        <div style="float: right" v-if="alerts.includes('red')"><RedBtn /></div>
      </transition>
      <transition mode="out-in" name="heartBeat" enter-active-class="animated flash" leave-active-class="animated flipOutX">
        <div style="float: left" v-show="alerts.includes('blue')"><BlueBtn /></div>
      </transition>
      <transition mode="out-in" name="heartBeat" enter-active-class="animated flash" leave-active-class="animated flipOutX">
        <h3 v-if="alerts.includes('yellow')">alerte jaune</h3>
      </transition>
    </div>
  </div>
</div>

</template>

<script>
import { mapState, mapGetters } from 'vuex';
import router from '../router';
import RedBtn from './RedButton.vue';
import BlueBtn from './BlueButton.vue';

export default {
  name: 'TeacherDisplay',
  components: {
    RedBtn,
    BlueBtn,
  },

  data() {
    return {
      messages: [],
      roomInfos: [],
      welcomes: [],
      alerts: [],
      events: [],
      students: [],
      teacher: [],
      host: [],
    };
  },

  computed: {
    ...mapState('authentication', [
      'user',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
      'isConnected',
    ]),
  },

  beforeDestroy() {
    this.$socket.emit('closeRoom');
    this.$socket.close();
    // ajouter une fenêtre de confirmation ?
    // metttre un  this.disconnet() ??
  },

  sockets: {
    joiningEvent(data) {
      console.log('data :', data);
      const { room } = data;
      const connectedUser = {
        username: data.username,
        id: data.user_id,
        role: data.user_role,
      };
      const loggedUserID = this.user.userID;
      const connectedUserID = data.user_id;

      if (connectedUserID === loggedUserID) {
        this.messages.push(`You've joined ${room}`);
      } else {
        this.messages.push(data.message);
      }

      if (connectedUser.role === 'teacher') {
        this.teacher.push(connectedUser);
      } else if (connectedUser.role === 'student') {
        this.students.push(connectedUser);
      }
    },

    leavingEvent(data) {
      this.messages.push(data.message);
      this.students = this.students.filter(student => student.id !== data.user_id);
    },
    roomCreation(data) {
      console.log('room creation data', data);
      this.roomInfos.push(data);
    },
    event(data) {
      this.events.push({ tag: data.color, timestamp: data.time, username: data.username });
      if (data.color === 'blue') {
        this.alerts.push(data.color);
        setTimeout(this.resetAlerts, 2000);
      }
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
          // function resetAlerts() {
          //   console.log('reset this alerts', alerts);
          //   console.log('setime out');
          //   alerts.splice(0, 1);
          // }
          // this.resetAlerts();
          setTimeout(this.resetAlerts, 2000);
          // }
          this.events = this.events.filter(x => x.tag !== color);
        });
      }
    },
  },

  methods: {
    alertTags() {
      return ['green', 'yellow', 'red'].filter(x => this.events.filter(y => Date.now() - y.timestamp < 30000).filter(y => y.tag === x).length > ((this.students.length + 3) / 2));
    },

    closeRoom(data) {
      alert('Vous allez fermer ce cours'); // remplacer par une fenêtre de confirmation
      this.$socket.emit('closeRoom', console.log('fermeture'), {
        data,
      });
      router.push('/about');
    },
    resetAlerts() {
      const { alerts } = this;
      console.log('reset this alerts', alerts);
      console.log('setime out');
      alerts.splice(0, 1);
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
