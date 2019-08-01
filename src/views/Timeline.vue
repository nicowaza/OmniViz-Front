<template>
  <div>
    <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center; height: 100%;">
      <div style="overflow-x: scroll; width: 80%; position: relative; height: 15%">
        <div class="timeline">
          <div v-for="tag in tagsStyle" :key="tag.id" :style="tag"></div>
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
      // tagsPosition: [],
      // avatar: '../public/img/avatar/slash.jpg',
    };
  },

  mounted() {
    const id = this.$store.state.route.params.roomID;
    this.fetchRoom(id);
  },

  computed: {
    // calcCoordinates(time, startClass) {
    //   const tagSecondes = time - startClass;
    //   console.log('tag sec ', tagSecondes);
    //   const tagPixPosition = tagSecondes * (1800 / this.classDuration);
    //   console.log('tag PixPosition ', tagPixPosition);
    //   const tagTimelinePosition = tagPixPosition / (1800 / 100);
    //   console.log(tagTimelinePosition);
    //   return tagTimelinePosition;
    //   // console.log('position', tagTimelinePosition);
    //   // console.log(tagTimelinePosition);
    // },
    tagsStyle() {
      return this.tags.map(tag => ({
        ...tag,
        backgroundColor: tag.color,
        top: '-30px',
        left: `${(((tag.time - this.roomInfos[0].startClass) * (1800 / this.classDuration)) / 18)}%`, // calcul de la position du tag en pourcentage par rapport à son timestamp : (tag timestamp- timestamp du début du cours) * (width de la div de la timeline (ici définie à 1800px) / durée du cours en secondes). Et ce résultat est divisé par la width de la div / 100 pour obtenir un nombre correspondant à un pourcentage de distance par rapport au début de la div donc du cours
        height: '20px',
        width: '15px',
        position: 'absolute',
      }));
    },
  },

  methods: {
    fetchRoom(roomID) {
      HTTP().get(`/rooms/${roomID}`, {

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

            this.newTagArray();
            console.log('this tag after', this.tags);
          }
        })
        .catch(() => {
          // ne marche pas...les erreurs sont attrapées dans le else if précédent...to fix

        });
    },

    // newTagArray(startClass) {
    //   this.tagsPosition = this.tags.map(x => this.calcCoordinates(this.tags[x].time, startClass));
    // },
  },
};
</script>

<style>
  .timeline {
      position: relative;
      top: 30px;
      border: 1px solid #000;
      width: 1800px;
      margin: auto;
      margin-top: 1%;
      margin-bottom: 5%;
  }
</style>
