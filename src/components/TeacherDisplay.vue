
<template>
  <div id="1s">
    <v-container style="display: flex; justify-content: space-around;">
      <div>
        <h3>TEACHER: </h3>
        <p>{{ this.rooms[0].authorFirstname }} {{ this.rooms[0].authorLastname }}</p>
        <h3>CLASS:  </h3>
        <p>{{ this.rooms[0].title }}</p>

      </div>
      <v-btn color="red" @click="closeRoom()">close</v-btn>
    </v-container>
    <v-container class="test" style="height: 100%; display: flex; justify-content: space-around; flex-wrap: wrap; margin-top: 0px;">
      <!-- <div class="interactiveBox"> -->
      <div>
        <div v-if="alerts.includes('red')"> <v-img
          height="200px"
          width="200px"
          src="/img/icons/bell-alarm_04_red.png"
          class="wiggle"
        ></v-img></div>
        <div v-else><v-img
          class="imgSize"
          src="/img/icons/bell-alarm_04_green.png"
        ></v-img></div>
        <audio id=audio controls loop>
          <source src="../../public/sounds/Wrong-alert-beep-sound.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
        </audio>

        <br>
        <br>
      </div>
    <div id="chatbox" class="elevation-24">
      <div style="padding: 5px 0" v-for="message in messages" :key="message.id">
      <p style="margin: 5px 0;">{{ message }}</p>
      </div>
    </div>
  </v-container>
</div>

</template>

<script>
import {
  mapState, mapGetters, mapActions, mapMutations,
} from 'vuex';
import moment from 'moment';
import router from '../router';
import RedBtn from './RedButton.vue';
// import BlueBtn from './BlueButton.vue';
import GreenBtn from './GreenButton.vue';


export default {
  name: 'TeacherDisplay',
  components: {
    RedBtn,
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
    const id = this.$store.state.route.params.roomID;
    this.fetchRoomsById(id)
      .then(() => {
        this.roomInfos.push(this.rooms);
        if (this.rooms[0].authorID === this.user.userID) {
          this.messages.push(`You've joined ${this.rooms[0].title}`);
        }
        //  else {
        //   this.messages.push(`${this.user.username} has joined ${this.rooms[0].title}`);
        // }

        if (this.user.role === 'teacher') {
          this.teacher.push(this.user);
        }
        // else if (this.user.role === 'student') {
        //   this.students.push(this.user);
        // }
      });

    this.scrollToBottom();
  },

  updated() {
    this.scrollToBottom();
  },

  computed: {
    ...mapState('authentication', [
      'user',
    ]),
    ...mapState('rooms', [
      'rooms',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
      'isConnected',
    ]),
  },

  beforeDestroy() {
    // this.$socket.emit('closeRoom');
    this.$socket.close();
    // ajouter une fenêtre de confirmation ?
  },

  sockets: {
    joiningEvent(data) {
      console.log('data :', data.roomData);
      const { roomName } = data.roomData;
      console.log('room', roomName);

      // if (this.roomInfos.length === 0) {
      //   this.roomInfos.push(data.roomData);
      //   console.log('this.roomInfos', this.roomInfos);
      // }

      const connectedUser = {
        username: data.username,
        id: data.user_id,
        role: data.user_role,
      };
      const loggedUserID = this.user.userID;
      const connectedUserID = data.user_id;
      console.log('logged user id', loggedUserID);
      console.log('conncected user id', connectedUserID);

      // {
      //   this.messages.push(`You've joined ${roomName}`);
      // } else
      if (connectedUserID !== loggedUserID) {
        this.messages.push(data.message);
      }

      // if (connectedUser.role === 'teacher') {
      //   this.teacher.push(connectedUser);
      // } else
      if (connectedUser.role === 'student') {
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
      console.log('event data', data);
      this.events.push({ tag: data.color, timestamp: data.time, username: data.username });
      if (data.color === 'blue') {
        this.alerts.push(data.color);
        const timeToString = moment((data.time) * 1000).format('HH:mm:ss');
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
    ...mapMutations('rooms', [
      'setRooms',
    ]),
    ...mapActions('rooms', [
      'fetchRoomsById',
    ]),
    // permet d'afficher les derniers messages en bas du chatbox
    scrollToBottom() {
      const messageBox = document.getElementById('chatbox');
      messageBox.scrollTop = messageBox.scrollHeight;
    },

    alertTags() {
      return ['red'].filter(x => this.events.filter(y => (Date.now() / 1000) - y.timestamp < 30000).filter(y => y.tag === x).length > ((this.students.length) / 2));
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
.imgSize {
  height: 200px;
  width: 200px;
}

#chatbox {
  background-color: #ffffff;
  height: 100px;
  width: 300px;
  /* min-width: 300px; */
  overflow-y: scroll;
  margin: 10px 30px;
  padding: 0 30px;
  border-radius: 10px;
  text-align: center;
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

@media (min-width: 1240px) {
  #chatbox {
    width: 380px;
    height: 250px;
  }
  .imgSize {
  height: 250px;
  width: 250px;
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
