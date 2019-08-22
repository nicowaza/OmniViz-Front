<template>
  <div class="btnContainer">
    <!-- <div v-for="message in messages" :key="message.id">
      <p>{{ message }}</p>
    </div> -->
    <div class="btnRow1">
      <v-btn id="btnGreen" round light class="button btnGreen" @click="clickTag('green')"><span class="text-wrap" >GOT IT !</span></v-btn>
      <v-btn id="btnRed" class="button btnRed" @click="clickTag('red')"><span class="text-wrap">NOT UNDERSTOOD</span></v-btn>
    </div>
    <div class="btnRow2">
      <v-btn id="btnBlue" class="button btnBlue" @click="clickTag('blue')"><span class="text-wrap">MORE INFO</span></v-btn>
      <v-btn id="btnYellow" class="button btnYellow" @click="clickTag('yellow')"><span class="text-wrap">INTERESTING</span></v-btn>
  </div>
</div>

</template>

<script>

import { mapState, mapGetters } from 'vuex';
import router from '../router';

export default {
  name: 'StudentBtn',
  props: {
  },
  data() {
    return {
      messages: [],
      participants: [],
      students: [],
      teacher: [],
    };
  },
  beforeDestroy() {
    this.$socket.emit('leave');
    this.$socket.close();
  },

  // ne fonctionne pas...
  beforeCreate() {
    if (this.isLoggedIn === false) {
      router.push('/login');
    }
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
      console.log(loggedUserID);
      console.log(connectedUserID);
      if (connectedUserID === loggedUserID) {
        this.messages.push(`You've joined ${room}`);
      } else {
        this.messages.push(data.message);
      }

      this.participants.push({
        username: data.username,
        id: data.user_id,
        role: data.user_role,
      });

      if (connectedUser.role === 'teacher') {
        this.teacher.push(connectedUser);
      } else if (connectedUser.role === 'student') {
        this.students.push(connectedUser);
      }
    },

    leavingEvent(data) {
      console.log('leaving data :', data);
      this.messages.push(data.message);
      this.participants = this.participants.filter(participant => participant.id !== data.user_id);
      this.students = this.students.filter(student => student.id !== data.user_id);
    },

    closeRoom(data) {
      console.log('classe fermée :', data);
      this.$socket.close();
      alert(`Cette classe a été fermée par ${this.teacher.username}`);
      router.push('/roomsList');
    },
  },
  methods: {
    clickTag(color) {
      const timestamp = Date.now() / 1000;
      console.log(timestamp);
      this.$socket.emit('tag', {
        tag: color,
        timestamp,
      });
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .btnRow1 {
    // display: inline-block;
  }
  .btnRow2 {
    // display: inline-block;
  }

  .btnContainer {
    display: inline-block;
    text-align: center;
    min-width: 320px;
  }
  .text-wrap{
  white-space: normal;
  }
  #btnGreen {
    color: #1f7709;
    background-color: #06b57e;
    -webkit-box-shadow:inset 2px -6px 15px #202520;
    -moz-box-shadow:    inset 2px -6px 15px #202520;
    box-shadow:        inset 2px -6px 15px #202520;
  }
  #btnGreen span {
    color: white;
    text-shadow: 1px 1px 2px black;
  }
  .btnGreen span{
    color: rgb(51, 255, 0);
    background-color: green;
  }
  #btnRed {
    background-color: #c71f4c;
    -webkit-box-shadow:inset 2px -6px 15px #202520;
   -moz-box-shadow:    inset 2px -6px 15px #202520;
   box-shadow:        inset 2px -6px 15px #202520;
  }
  #btnRed span {
    color: white;
    text-shadow: 1px 1px 2px black;
  }
  .btnRed {
    color: #fff;
    background-color: red;
  }
  #btnBlue {
    background-color:#1591b1;
    -webkit-box-shadow:inset 2px -6px 15px #202520;
   -moz-box-shadow:    inset 2px -6px 15px #202520;
   box-shadow:        inset 2px -6px 15px #202520;
  }
 #btnBlue span {
    color: white;
    text-shadow: 1px 1px 2px black;
  }
  .btnBlue {
    color: #fff;
    background-color: Blue;
  }
  #btnYellow {
    background-color: #c6da61;
     -webkit-box-shadow:inset 2px -6px 15px #25210b;
   -moz-box-shadow:    inset 2px -6px 15px #25210b;
   box-shadow:        inset 2px -6px 15px #25210b;
  }
  #btnYellow span {
    color: white;
    text-shadow: 1px 1px 2px black;
  }
  .btnYellow {
    color: #fff;
    background-color: #d6ef5d;
  }
  .button {
    width: 125px;
    height: 125px;
    padding: 0px 25px;
    font-size: 15px;
    font-style: italic;
    text-align: center;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 15px;
    white-space: pre-wrap;
  }

  @media (min-width: 430px) {
    .button {
      width: 180px;
      height: 180px;
    }
  }

  @media (min-width: 970px) {
    .button {
      width: 250px;
      height: 250px;
    }
  }
</style>
