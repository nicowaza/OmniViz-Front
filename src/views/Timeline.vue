<template>
  <div>
    <div style="height: inherit">
      <div class="text-center" style="padding: 40px 9% 0;">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              color="#463e54"
              v-on="on"
            ><v-icon style="color: #f6f6e5" left>expand_more</v-icon>
            <span style="color: #f6f6e5">Participants</span>
            </v-btn>
          </template>
          <v-list v-if="this.user.role === 'teacher'">
            <v-list-tile @click="filterTagsReset()">all</v-list-tile>
          </v-list>
          <v-list v-for="participant in participants" :key="participant.id">
            <v-list-tile @click="filterTags(participant.userID)">{{ participant.username }}</v-list-tile>
          </v-list>
        </v-menu>
      </div>
      <div style="display: flex; justify-content: center; color: #f6f6e5">
         <div style="padding: 0 9%; font-size: 30px; margin-top: 5vh;">{{ formattedTime }}</div>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center; height: 40%;">
        <div style="overflow-x: auto; text-align: center; width: 80%; position: relative; height: 400px">
          <div class="timeline">
            <transition name="fade">
              <div v-if="this.activeIndexStyle[0].backgroundColor === 'blue'" key="blue" :style="this.activeIndexStyle[0]">
                <div>
                  <p style="padding: 20px 10px 0;">At {{ moment.utc(((this.activeIndexStyle[0].time - this.roomInfos[0].startClass)) * 1000).format('HH:mm:ss') }}:</p>
                  <p>{{ this.activeIndexStyle[0].username }}</p>
                  <p style="padding: 0 10px 10px;">had a question</p>
                </div>
                <v-icon class="alignCancel" @click="closeModal()">cancel</v-icon>
              </div>
              <div v-else-if="this.activeIndexStyle[0].backgroundColor === 'red'" key="red" :style="this.activeIndexStyle[0]">
                <div>
                  <p style="padding: 20px 10px 0;">At {{ moment.utc(((this.activeIndexStyle[0].time - this.roomInfos[0].startClass)) * 1000).format('HH:mm:ss') }}:</p>
                  <p>{{ this.activeIndexStyle[0].username }}</p>
                  <p style="padding: 0 10px 10px;">didn't understand</p>
                </div>
                <v-icon class="alignCancel" @click="closeModal()">cancel</v-icon>
              </div>
              <div v-else-if="this.activeIndexStyle[0].backgroundColor === 'yellow'" key="yellow" :style="this.activeIndexStyle[0]">
                <div>
                  <p style="padding: 20px 10px 0;">At {{ moment.utc(((this.activeIndexStyle[0].time - this.roomInfos[0].startClass)) * 1000).format('HH:mm:ss') }}:</p>
                  <p>{{ this.activeIndexStyle[0].username }}</p>
                  <p style="padding: 0 10px 10px;">needs more infos</p>
                </div>
                <v-icon class="alignCancel" @click="closeModal()">cancel</v-icon>
              </div>
              <div v-else-if="this.activeIndexStyle[0].backgroundColor === 'green'" key="green" :style="this.activeIndexStyle[0]">
                <div>
                  <p style="padding: 20px 10px 0;">At {{ moment.utc(((this.activeIndexStyle[0].time - this.roomInfos[0].startClass)) * 1000).format('HH:mm:ss') }}:</p>
                  <p>{{ this.activeIndexStyle[0].username }}</p>
                  <p style="padding: 0 10px 10px;">loves it !</p>
                </div>

                <v-icon class="alignCancel" @click="closeModal()">cancel</v-icon>
              </div>
              <div v-else :style="this.activeIndexStyle[0]"></div>
            </transition>
            <div v-for="(tag, index) in tagsStyle" :key="tag.id" :style="tag" @click="showModal(index)"></div>
            <!-- <v-slider
            style="padding: 0 20px"
            v:model="slider"
            thumb-label="always"
            ></v-slider> -->
            <v-progress-linear
              height="15"
              :value="slider"
              striped
              color="light-blue"
              reactive
            ></v-progress-linear>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center; margin: 20px 9%;">
        <v-btn
        class="success btnrectangle"
        @click="start()"
        :disabled="this.timerState === 'running'"
        >
        Play
        </v-btn>
        <v-btn
        class="info btnrectangle"
        @click="pause()"
        :disabled="this.timerState === 'stopped' || this.timerState === 'paused'"
        >
        Pause
        </v-btn>
        <v-btn
        class="error btnrectangle"
        @click="stop()"
        :disabled="this.timerState === 'stopped'"
        >
        Stop
        </v-btn>
      </div>
    </div>
  </div>

</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import HTTP from '../http';

export default {
  name: 'Timeline',
  data() {
    return {
      roomInfos: [],
      classDuration: '',
      tags: [],
      tagsRef: [],
      activeIndex: '',
      activeIndexStyle: [{}],
      participants: [],
      timerState: 'stopped',
      currentTimer: 0,
      formattedTime: '00:00:00',
      ticker: undefined,
      sliderTicker: undefined,
      slider: 0,
    };
  },

  mounted() {
    // permet de récupérer l'id de la room présente dans l'url
    const id = this.$store.state.route.params.roomID;
    this.fetchRoom(id);
    this.fetchParticipants(id);
    // this.pixBySec();
  },

  computed: {
    ...mapState('authentication', [
      'user',
    ]),
    tagsStyle() {
      return this.tags.map(tag => ({
        ...tag,
        backgroundColor: tag.color,
        top: '-30px',
        left: `${(((tag.time - this.roomInfos[0].startClass) * (5400 / this.classDuration)) / 54)}%`, // calcul de la position du tag en pourcentage par rapport à son timestamp : (tag timestamp- timestamp du début du cours) * (width de la div de la timeline (ici définie à 1800px) / durée du cours en secondes). Et ce résultat est divisé par la width de la div / 100 pour obtenir un nombre correspondant à un pourcentage de distance par rapport au début de la div donc du cours
        height: '20px',
        width: '5px',
        position: 'absolute',
        cursor: 'pointer',

      }));
    },

    tagModal() {
      return this.tags.map(tag => ({
        ...tag,
        color: 'black',
        backgroundColor: tag.color,
        user: `${tag.userID}`,
        top: '-160px',
        height: '100px',
        width: '250px',

        position: 'absolute',
        left: `${(((tag.time - this.roomInfos[0].startClass) * (5400 / this.classDuration) - 125) / 54)}%`,
        display: 'flex',
        justifyContent: 'space-around',
        borderRadius: '15px',
      }));
    },
  },

  // watch: {
  //   slider(val) {
  //     if (val) {
  //       return this.slider;
  //     }
  //   },
  // },

  methods: {
    fetchRoom(roomID) {
      HTTP().get(`/rooms/timeline/${roomID}`, {

      })
        .then(({ data, err }) => {
          if (err) {
            console.log(err);
          } else if (data.status === 200) {
            console.log('data', data);
            const roomData = data;
            // stocke dans cette variable roomTags tous les tags récupérés en lien avec cette classe
            const roomTags = roomData.content2;

            // stocke dans des variable toutes les datas de la classe récupérer par la requête puis on les pousse dans un tableau (roomInfos)
            const {
              startClass, endClass, authorID, authorFirstname, authorLastname, authorUsername, title,
            } = roomData.content1[0];

            this.roomInfos.push({
              roomID,
              authorID,
              authorFirstname,
              authorLastname,
              authorUsername,
              title,
              startClass,
              endClass,
            });

            // calcule la durée du cours
            const classDuration = endClass - startClass;
            this.classDuration = classDuration;

            // condition qui détermine les tags à afficher suivant le role du user: le professeur (teacher) a accès à tous les tags de tous les participants à la classe (room). Un élève n'a accès qu'à ses données (tags) propres
            if (this.user.role === 'teacher') {
              this.tags = roomTags;
              console.log('this tags teacher', this.tags);
            } else if (this.user.role === 'student') {
              this.tags = roomTags.filter(roomTag => roomTag.userID === this.user.userID);
              console.log('userID', this.user.userID);
              console.log('student tags', this.tags);
            }

            // tagsRef est le tableau de référence non mutable qui contient tous les tags de la room
            this.tagsRef = roomData.content2;
          }
        })
        .catch(() => {
          // ne marche pas...les erreurs sont attrapées dans le else if précédent...to fix

        });
    },

    fetchParticipants(roomID) {
      HTTP().get(`/rooms/participants/${roomID}`, {
      })
        .then(({ data, err }) => {
          if (err) {
            console.log(err);
          } else if (data.status === 200) {
            const participants = data.results;

            // filtre l'affichage des participants à la classe en fonction du rôle du user: si le user est un professeur (teacher) tous les participants à la classe seront affichés dans la liste. Si le user est un élève (student), seul son nom sera affiché dans la liste
            if (this.user.role === 'teacher') {
              this.participants = participants;
              console.log('techaer role this particpants', this.particiants);
            } else if (this.user.role === 'student') {
              this.participants = participants.filter(participant => participant.userID === this.user.userID);
              console.log('array particpants filtered', this.participants);
            }
          }
        })
        .catch(() => {
          // ne marche pas...les erreurs sont attrapées dans le else if précédent...to fix
        });
    },
    // affiche le modal correspondant au tag cliqué
    showModal(index) {
      this.activeIndex = index;
      // stocke l'élément du tableau de modal correspondant à l'index de l'élément séléctionné dans le tableau des tags
      const activeStyle = this.tagModal[this.activeIndex];
      // l'élément isolé est poussé dans le tableau activeIndexStyle si celui ci est vide, sinon on remplace l'élément présent par le nvl élément séléctionné
      if (this.activeIndexStyle[0]) {
        this.activeIndexStyle.splice(0, 1, activeStyle);
      } else this.activeIndexStyle.push(activeStyle);

      this.activeIndexStyle[0].display = 'flex';
    },

    // ferme le modal
    closeModal() {
      this.activeIndexStyle[0].display = 'none';
    },

    // filtre les tags pour le user choisit
    filterTags(id) {
      console.log('participantsID', id);
      this.tags = this.tagsRef;
      this.tags = this.tags.filter(tag => tag.userID === id);
      console.log('new tags', this.tags);
    },

    filterTagsReset() {
      this.tags = this.tagsRef;
    },

    // démarre le timer et la progress bar
    start() {
      if (this.timerState !== 'running') {
        this.tick();
        this.sliderTick();
        this.timerState = 'running';
      }
    },

    // pause le timer et la progress bar
    pause() {
      window.clearInterval(this.ticker);
      window.clearInterval(this.sliderTicker);
      this.timerState = 'paused';
    },

    // reset le timer et la progress bar
    stop() {
      window.clearInterval(this.ticker);
      window.clearInterval(this.sliderTicker);
      this.currentTimer = 0;
      this.slider = 0;
      this.formattedTime = '00:00:00';
      this.timerState = 'stopped';
    },

    // incrémente le timer toutes les secondes
    tick() {
      this.ticker = setInterval(() => {
        this.currentTimer += 1;
        this.formattedTime = this.formatTime(this.currentTimer);
      }, 1000);
      if (this.currentTimer === this.classDuration) {
        this.pause();
      }
    },

    // passe les secondes et les formatte
    formatTime(seconds) {
      const measuredTime = new Date(null);
      measuredTime.setSeconds(seconds);
      // formate les secondes en heures:minutes:secondes
      const HMSTime = measuredTime.toISOString().substr(11, 8);
      return HMSTime;
    },

    // incrémente la valeur de la progress bar
    sliderTick() {
      this.sliderTicker = setInterval(() => {
        this.slider += (1 / 30);
      }, 100);
    },
  },
};
</script>

<style>
.btnrectangle {
  min-width: 0;
  width: 80px;
  height: 30px;
}
.timeline {
    position: relative;
    top: 77%;
    /* border: 1px solid #000; */
    width: 5400px;
    margin: auto;
    margin-top: 1%;
    margin-bottom: 5%;
}
.alignCancel {
  padding: 0 5px 25px 0;
  cursor: pointer;
  color: black
}
.fade-enter-active, .fade-leave-active {
transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
opacity: 0;
}
p{
  margin-bottom: 0;
}
</style>
