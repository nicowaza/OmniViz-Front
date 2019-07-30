
<template>
  <div id="1s">
    <v-container style="display: flex; justify-content: space-around;">
      <div>
        <h3>TEACHER: </h3>
        <p>{{ this.roomInfos[0].roomData.authorFirstname }} {{ this.roomInfos[0].roomData.authorLastname }}</p>
        <h3>CLASS:  </h3>
        <p>{{ this.roomInfos[0].roomData.roomName }}</p>

      </div>
      <v-btn color="red" @click="closeRoom()">close</v-btn>
    </v-container>
    <v-container class="test" style="height: 100%; display: flex; justify-content: space-around; flex-wrap: wrap; margin-top: 0px;">
      <!-- <div class="interactiveBox"> -->
      <div>
      <!-- <transition mode="in-out" name="animate" enter-active-class="animated flash" leave-active-class="animated flipOutX">
        <h3 v-show="alerts.includes('green')">alerte verte</h3>
      </transition> -->
        <!-- <transition mode="in-out" name="animate" enter-active-class="animated flash" leave-active-class="animated flipOutX"> -->
        <div v-if="alerts.includes('red')"><RedBtn class="wiggle" /></div>
        <div v-else><GreenBtn /></div>

        <audio id=audio controls loop>
          <source src="../../public/sounds/Wrong-alert-beep-sound.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
        </audio>

        <!-- </transition>
        <br>
        <br> -->
        <br>
        <br>
      <!-- <transition mode="out-in" name="heartBeat" enter-active-class="animated flash" leave-active-class="animated flipOutX">
        <div v-show="alerts.includes('blue')"><BlueBtn /></div>
      </transition>
      <transition mode="out-in" name="heartBeat" enter-active-class="animated flash" leave-active-class="animated flipOutX">
        <h3 v-if="alerts.includes('yellow')">alerte jaune</h3>
      </transition> -->
      </div>
    <div id="chatbox">
      <div style="padding: 5px 0" v-for="message in messages" :key="message.id">
      <p style="margin: 5px 0;">{{ message }}</p>
      </div>
    </div>
    <!-- </div> -->
  </v-container>
</div>

    <!-- <div style="display: flex; justify-content: space-around; width: 300px;">
      <div style="display: flex">
        <div style="width: 20px; height: 20px; background-color: green; margin-left: 10px">
        </div>
        <p style="margin-left: 3px"># {{ events.filter(x => x.tag=="green").length }}</p>
      </div>
      <div style="display: flex">
        <div style="width: 20px; height: 20px; background-color: red; margin-left: 10px">
        </div>
        <p style="margin-left: 3px;"># {{ events.filter(x => x.tag=="red").length }}</p>
      </div>
      <div style="display: flex">
        <div style="width: 20px; height: 20px; background-color: blue; margin-left: 10px">
        </div>
        <p style="margin-left: 3px;"># {{ events.filter(x => x.tag=="blue").length }}</p>
      </div>
      <div style="display: flex">
        <div style="width: 20px; height: 20px; background-color: yellow; margin-left: 10px">
        </div>
        <p style="margin-left: 3px;"># {{ events.filter(x => x.tag=="yellow").length }}</p>
      </div> -->

</template>

<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';
import router from '../router';
import RedBtn from './RedButton.vue';
import BlueBtn from './BlueButton.vue';
import GreenBtn from './GreenButton.vue';


export default {
  name: 'TeacherDisplay',
  components: {
    RedBtn,
    BlueBtn,
    GreenBtn,
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

  mounted() {
    this.scrollToBottom();
  },

  updated() {
    this.scrollToBottom();
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
  },

  sockets: {
    joiningEvent(data) {
      console.log('data :', data);
      const { roomName } = data.roomData;
      console.log('room', roomName);
      this.roomInfos.push(data);
      console.log('this.roomInfos', this.roomInfos);
      console.log('data joining event', data);
      // console.log('this infos', this.roomInfos[0].authorFirstname);
      const connectedUser = {
        username: data.username,
        id: data.user_id,
        role: data.user_role,
      };
      const loggedUserID = this.user.userID;
      const connectedUserID = data.user_id;

      if (connectedUserID === loggedUserID) {
        this.messages.push(`You've joined ${roomName}`);
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
        const timeToString = moment(data.time).format('HH:mm:ss');
        console.log('time', timeToString);
        this.messages.push(`At ${timeToString}: ${data.username} has a question `);

        window.navigator.vibrate(6000); // vibrate the device for 5s
        setTimeout(this.resetAlerts(), 6000);
      }
      console.log('this alert tags()', this.alertTags());
      console.log('this alerts', this.alerts);
      console.log(data);

      if (this.alertTags()) {
        this.alertTags().forEach((color) => {
          const { alerts } = this;
          alerts.push(color);
          // this.playAudio();
          this.playAudio();
          setTimeout(() => { this.resetAlerts(); this.pauseAudio(); }, 6000);
          this.events = this.events.filter(x => x.tag !== color);
        });
      }
    },
  },

  methods: {
    // permet d'afficher les derniers messages en bas du chatbox
    scrollToBottom() {
      const messageBox = document.getElementById('chatbox');
      messageBox.scrollTop = messageBox.scrollHeight;
    },

    alertTags() {
      return ['green', 'yellow', 'red'].filter(x => this.events.filter(y => Date.now() - y.timestamp < 30000).filter(y => y.tag === x).length > ((this.students.length) / 2));
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


    playAudio() {
      const x = document.getElementById('audio');
      x.play();
    },

    pauseAudio() {
      const x = document.getElementById('audio');
      x.pause();
      x.currentTime = 0;
    },
  },
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

h1 {
  font-size: 3em;
}

.interactiveBox {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 80px;
}

#chatbox {
  background-color: white;
  height: 100px;
  width: 300px;
  /* min-width: 300px; */
  overflow-y: scroll;
  margin: 10px 30px;
  padding: 0 30px;
}
#chatbox p {
  padding: 5px 0;
  margin: 10px 0;
}
.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  border-radius: 25px;
}

.v-btn__content {
  color: #231846;
}

@media (min-width: 820px) {
  #chatbox {
    width: 380px;
    height: 100px;
  }
}

@media (min-width: 1560px) {
  #chatbox {
    width: 380px;
    height: 380px;
  }
}

@media (max-height: 740px ) {
  .interactiveBox {
    margin-top: 30px;
  }
}
  .wiggle {
  animation: wiggle 75ms infinite;
  animation-timing-function: linear;
}

@keyframes wiggle {
  0% { transform: translate(5px, 0); }
  50% { transform: translate(-5px, 0); }
  100% { transform: translate(5px, 0); }
}
#audio {
  display: none;
}

</style>
