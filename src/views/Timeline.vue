<template>
  <div>
    <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center; height: 100%;">
      <div style="overflow-x: scroll; width: 80%; position: relative; height: 28%">
        <div class="timeline">
          <transition name="fade">
            <div v-if="this.activeIndexStyle[0].backgroundColor === 'blue'" key="blue" :style="this.activeIndexStyle[0]">
              <p class="centerText">{{ this.activeIndexStyle[0].user }} had a question</p>
              <v-icon class="alignCancel" v-on:click="closeModal()">cancel</v-icon>
            </div>
            <div v-else-if="this.activeIndexStyle[0].backgroundColor === 'red'" key="red" :style="this.activeIndexStyle[0]">
              <p class="centerText">{{ this.activeIndexStyle[0].user }} didn't understand</p>
              <v-icon class="alignCancel" v-on:click="closeModal()">cancel</v-icon>
            </div>
            <div v-else-if="this.activeIndexStyle[0].backgroundColor === 'yellow'" key="yellow" :style="this.activeIndexStyle[0]">
              <p class="centerText">{{ this.activeIndexStyle[0].user }} needs more infos</p>
              <v-icon class="alignCancel" v-on:click="closeModal()">cancel</v-icon>
            </div>
            <div v-else-if="this.activeIndexStyle[0].backgroundColor === 'green'" key="green" :style="this.activeIndexStyle[0]">
              <p class="centerText">{{ this.activeIndexStyle[0].user }} loves it ! </p>
              <v-icon class="alignCancel" v-on:click="closeModal()">cancel</v-icon>
            </div>
            <div v-else :style="this.activeIndexStyle[0]"></div>
          </transition>
          <div v-for="(tag, index) in tagsStyle" :key="tag.id" :style="tag" v-on:click="showModal(index)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HTTP from '../http';

export default {
  name: 'Timeline',
  data() {
    return {
      roomInfos: [],
      classDuration: '',
      tags: [],
      activeIndex: '',
      activeIndexStyle: [{}],
    };
  },

  mounted() {
    // permet de récupérer l'id de la room présente dans l'url
    const id = this.$store.state.route.params.roomID;
    this.fetchRoom(id);
  },

  computed: {
    tagsStyle() {
      return this.tags.map(tag => ({
        ...tag,
        backgroundColor: tag.color,
        top: '-30px',
        left: `${(((tag.time - this.roomInfos[0].startClass) * (1800 / this.classDuration)) / 18)}%`, // calcul de la position du tag en pourcentage par rapport à son timestamp : (tag timestamp- timestamp du début du cours) * (width de la div de la timeline (ici définie à 1800px) / durée du cours en secondes). Et ce résultat est divisé par la width de la div / 100 pour obtenir un nombre correspondant à un pourcentage de distance par rapport au début de la div donc du cours
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
        top: '-125px',
        height: '75px',
        width: '130px',

        position: 'absolute',
        left: `${(((tag.time - this.roomInfos[0].startClass) * (1800 / this.classDuration) - 62.5) / 18)}%`,
        display: 'flex',
        justifyContent: 'space-around',
        borderRadius: '15px',
      }));
    },
  },

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
            console.log('roomData', roomData);
            const {
              startClass, endClass, authorID, authorFirstname, authorLastname, authorUsername, title,
            } = roomData.content1[0];
            console.log(startClass);
            console.log(endClass);
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
            const classDuration = endClass - startClass;
            this.classDuration = classDuration;

            this.tags = roomData.content2;

            console.log('this tags before', this.tags);

            // this.newTagArray();
            // console.log('this tag after', this.tags);
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
      // l'élément isolé est pousser dans le tableau activeIndexStyle si celui ci est vide, sinon on remplace l'élément présent par le nvl élément séléctionné
      if (this.activeIndexStyle[0]) {
        this.activeIndexStyle.splice(0, 1, activeStyle);
      } else this.activeIndexStyle.push(activeStyle);

      this.activeIndexStyle[0].display = 'flex';
    },

    // ferme le modal
    closeModal() {
      this.activeIndexStyle[0].display = 'none';
    },
  },
};
</script>

<style>
  .timeline {
      position: relative;
      top: 60%;
      border: 1px solid #000;
      width: 1800px;
      margin: auto;
      margin-top: 1%;
      margin-bottom: 5%;
  }
  .alignCancel {
    padding: 0 5px 25px 0;
    cursor: pointer;
    color: black
  }
  .centerText {
    margin: 15px 5px;
    text-align: center;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  }
</style>
