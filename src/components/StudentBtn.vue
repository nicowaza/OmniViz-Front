<template>
  <div class="btnContainer">
    <!-- <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="pingServer()">Ping Server</button>
  </div> -->
    <div v-for="message in messages" :key="message.id">
      <p>{{ message.message }}</p>
    </div>
    <div v-for="room in roomInfos" :key="room.id">
      <p>{{ room.room }}</p>
    </div>
    <div class="btnRow1">
      <v-btn id="btnGreen" round light class="button btnGreen" @click="clickTag('green')"><span class="text-wrap" >GOT IT</span></v-btn>
      <v-btn id="btnRed" class="button btnRed" @click="clickTag('red')"><span class="text-wrap">NOT UNDERSTOOD</span></v-btn>
    </div>
    <div class="btnRow2">
      <v-btn id="btnBlue" class="button btnBlue" @click="clickTag('blue')"><span class="text-wrap">MORE INFO</span></v-btn>
      <v-btn id="btnYellow" class="button btnYellow" @click="clickTag('yellow')"><span class="text-wrap">INTERESTING</span></v-btn>
  </div>

    <!-- </div> -->
</div>

</template>

<script>

// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');
import { mapState } from 'vuex';
import { timeout } from 'q';

export default {
  name: 'StudentBtn',
  props: {

  },

  data() {
    return {
      messages: [],
      roomInfos: [],
      welcomes: [],
    };
  },

  computed: {
    ...mapState('authentication', [
      'user',
    ]),
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
  },

  methods: {
    clickTag(color) {
      const timestamp = Date.now();
      console.log('timestamp', timestamp);
      // $socket is socket.io-client instance
      this.$socket.emit('tag', {
        // user: this.user.username,
        // user_id: this.user.userID,
        tag: color,
        timestamp,
      });
    },
  },
};
// data() {
//   return {
//     isConnected: false,
//     socketMessage: '',
//   };
// },

// sockets: {
//   connect() {
//     // Fired when the socket connects.
//     this.isConnected = true;
//   },

//   disconnect() {
//     this.isConnected = false;
//   },

//   // Fired when the server sends something on the "messageChannel" channel.
//   messageChannel(data) {
//     this.socketMessage = data;
//   },
// },

// methods: {
//   pingServer() {
//     // Send the "pingServer" event to the server.
//     this.$socket.emit('pingServer', 'PING!');
//   },
// },
// data() {
//   return {

//   },
// }
// mounted() {
//   socket.on('connect', () => {
//     console.log('connected');
//   });
//   socket.on('disconnect', () => {
//     console.log('disconnected from server');
//   });
// },


// methods() {
//   // tagGreen(){

//   // }
// },

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
    border: 1px solid red;
    display: inline-block;
    text-align: center;
    min-width: 320px;
  }
  .text-wrap{
  white-space: normal;
  }
  #btnGreen {
    color: rgb(51, 255, 0);
    background-color: green;
  }
.btnGreen {
  color: rgb(51, 255, 0);
  background-color: green;
}
  #btnRed {
    background-color: red;
  }
.btnRed {
  color: #fff;
  background-color: red;
}
  #btnBlue {
    background-color: blue;
  }
.btnBlue {
  color: #fff;
  background-color: Blue;
}
  #btnYellow {
    background-color: yellow;
  }
.btnYellow {
  color: rgb(195, 182, 0);
  background-color: yellow;
}
// .btnGreen:hover {
//   background-color: #3e8e41
//   }
// .btnGreen:active {
//   background-color: #3e8e41;
// }

.button {
  width: 125px;
  height: 125px;
  padding: 0px 25px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
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


// .button:active {

//   box-shadow: 0 5px #666;
//   transform: translateY(4px);
// }
// </style>
