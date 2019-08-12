<template>
  <div>
    <v-container style="padding-bottom: 64px" >
      <div style="width: auto" >
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                color="#463e54"
                v-on="on"
              ><v-icon left>expand_more</v-icon>
              <span>Filter by</span>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile @click="fetchRooms()">Date of creation</v-list-tile>
              <v-list-tile @click="fetchRoomsByDate()">Class start Date</v-list-tile>
              <v-list-tile @click="fetchRoomsOfTheDay()">Classes of the day</v-list-tile>
              <v-list-tile @click="fetchMyRooms(user.userID)">My Classes</v-list-tile>
            </v-list>
          </v-menu>
        </div>
        <!-- <div style="display: flex; justify-content: start;">
          <v-btn @click="fetchRoomsByDate()">date</v-btn>
        </div> -->
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
          <div  v-for="(paginatedData, index) in paginatedDatas" :key="paginatedData.id">
            <v-card
              class="elevation-24"
            >
              <v-img
                height="100px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title style="color: white; font-size: 20px; text-transform: uppercase">{{ paginatedData.title }}</v-card-title>
              </v-img>
              <v-layout style="margin-top: 15px">
                <v-flex>
                  <h2 style="padding: 15px">teacher: {{ paginatedData.authorUsername }}</h2>
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
              <h3 style="padding-left: 15px; margin: 10px 0;">Day:  {{ moment(paginatedData.startClass * 1000).format('Mo MMM') }}</h3>
              <div style="display: flex; margin: 10px 0; ">
                <div style="padding-left: 15px">begining: {{ moment(paginatedData.startClass * 1000).format('HH mm') }} </div>
                <div style="padding-left: 15px">finishing: {{ moment(paginatedData.endClass * 1000).format('HH mm')}}
                </div>
              </div>
              <h3 style="padding-left: 15px;">Subject: </h3>
              <p style="height: 60px; width: 210px; overflow: auto; padding: 5px 15px 15px 15px; margin-bottom: 0;"
              >{{ paginatedData.description }}</p>
              <v-layout justify-space-around>
                <div>
                  <v-btn v-if="isValidTime(index)" @click="join(paginatedData.roomID,  paginatedData.title, paginatedData.authorID, paginatedData.authorLastname, paginatedData.authorFirstname)">Join
                  </v-btn>
                  <v-btn v-else @click="viewRoom(paginatedData.roomID)">Timeline</v-btn>
                </div>
                <div>
                  <v-btn >edit</v-btn>
                </div>
              </v-layout>
            </v-card>
            <br>
          </div>
        </div>
        <div style="display: flex; justify-content: space-around">
          <v-btn
              :disabled="pageNumber === 0"
              @click="prevPage">
              Previous
          </v-btn>
          <v-btn
              :disabled="pageNumber >= pageCount -1"
              @click="nextPage">
              Next
          </v-btn>
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
      pageNumber: 0, // default to page 0
      size: 6, // nombre de cours affichés par page
      // avatar: '../public/img/avatar/slash.jpg',
    };
  },

  mounted() {
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
    // calcul le nombre de pages
    pageCount() {
      console.log(this.rooms.length);
      const l = this.rooms.length;
      const s = this.size;
      return Math.ceil(l / s);
    },

    paginatedDatas() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.rooms.slice(start, end);
    },

  },

  methods: {
    ...mapMutations('rooms', [
      'setRooms',
    ]),
    ...mapActions('rooms', [
      'fetchRooms',
      'fetchRoomsByDate',
      'fetchRoomsOfTheDay',
      'fetchMyRooms',
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
      return currentDate > this.paginatedDatas[i].startClass && currentDate < this.paginatedDatas[i].endClass;
    },

    nextPage() {
      this.pageNumber += 1;
    },
    prevPage() {
      this.pageNumber -= 1;
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
  .v-btn {
    min-width: 100px;
  }
</style>
