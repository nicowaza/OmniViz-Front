<template>
  <div>
    <v-container >
      <div style="width: auto" >
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
          <div  v-for="(room, index) in rooms"
          :key="room.id"
          >
            <v-card
              class="elevation-24"
            >
              <v-img
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title style="color: white; font-size: 20px; text-transform: uppercase">{{ room.title }}</v-card-title>
              </v-img>
              <v-layout style="margin-top: 15px">
                <v-flex>
                  <v-subheader>teacher {{ room.authorID }}</v-subheader>
                </v-flex>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-flex>
                  <v-avatar
                    size="56px"
                  >
                    <img
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      alt="Avatar"
                    >
                  </v-avatar>
                </v-flex>
              </v-layout>

              <p style="height: 60px; width: 210px; overflow: auto; padding: 15px;"
              >{{ room.description }}</p>

              <v-layout justify-space-around>
                <div>
                  <v-btn v-if="isValidTime(index)" @click="join(room.roomID,  room.title, room.authorID, room.authorLastname, room.authorFirstname)">Join
                  </v-btn>
                  <v-btn v-else @click="viewRoom(room.roomID)">Timeline</v-btn>
                </div>
                <div>
                  <v-btn >edit</v-btn>
                </div>
              </v-layout>
            </v-card>
            <br>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>

import {
  mapActions, mapMutations, mapState, mapGetters,
} from 'vuex';

export default {
  name: 'roomsList',

  data() {
    return {
      roomInfos: [],
      // avatar: '../public/img/avatar/slash.jpg',
    };
  },


  mounted() {
    this.fetchRooms();
    if (this.isConnected === false) {
      this.$socket.open();
      this.connect();
      console.log('opening socket');
      console.log('user looged in', this.isLoggedIn);
    } else console.log('user logged ?', this.isLoggedIn);
  },

  computed: {
    ...mapState('rooms', [
      'rooms',
    ]),
    ...mapState('authentication', [
      'user',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
      'isConnected',
    ]),
  },

  methods: {
    ...mapMutations('rooms', [
      'setRooms',
    ]),
    ...mapActions('rooms', [
      'fetchRooms',
      'connect',
    ]),
    join(roomID, title, authorID, authorLastname, authorFirstname) {
      console.log('room name :', title);
      console.log('author :', authorID);
      console.log('author last name', authorLastname);

      this.$socket.emit('join', {
        roomID,
        roomName: title,
        createdBy: authorID,
        authorLastname,
        authorFirstname,
      });

      if (this.user) {
        if (this.user.role === 'student') {
          this.$router.push('/student/viz');
        } else {
          this.$router.push('/teacher');
        }
      } else {
        alert('unauthorized: you are not authentified');
      }
    },

    viewRoom(roomID) {
      this.$router.push(`/rooms/${roomID}`);
    },

    roomCreation(data) {
      console.log('room creation data', data);
      this.roomInfos.push(data);
    },

    isValidTime(i) {
      console.log('i ==', i);
      const currentDate = (Date.now() / 1000);
      console.log('date', currentDate);
      return currentDate > this.rooms[i].startClass && currentDate < this.rooms[i].endClass;
    },
  },
};
</script>

<style scoped  lang="scss">
  .v-card {
    min-width: 250px;
    height: auto;
    padding: 5px;
    margin: 15px;
    background-color:#a592a4;
  }
  .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
    @include submitBtn()
  }
</style>
