<template>
  <div>
    <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center; height: 100%;">
      <div style="overflow-x: scroll; width: 80%; position: relative; height: 15%">
        <div class="timeline">
          <div v-for="tag in tagsStyle" :key="tag.id" :style="tag.style"></div>
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
      tags: [
        {
          backgroundColor: 'red',
          top: '-30px',
          left: '3%',
          height: '20px',
          width: '15px',
          position: 'absolute',
        },
        {
          backgroundColor: 'blue',
          top: '-30px',
          left: '15%',
          height: '20px',
          width: '15px',
          position: 'absolute',
        },
        {
          backgroundColor: 'green',
          top: '-30px',
          left: '25%',
          height: '20px',
          width: '15px',
          position: 'absolute',
        },
        {
          backgroundColor: 'yellow',
          top: '-30px',
          left: '28%',
          height: '20px',
          width: '15px',
          position: 'absolute',
        },
        {
          backgroundColor: 'purple',
          top: '-30px',
          left: '56%',
          height: '20px',
          width: '15px',
          position: 'absolute',
        },
        {
          backgroundColor: 'orange',
          top: '-30px',
          left: '89%',
          height: '20px',
          width: '15px',
          position: 'absolute',
        },
      ],
      // avatar: '../public/img/avatar/slash.jpg',
    };
  },

  mounted() {
    const id = this.$store.state.route.params.roomID;
    this.fetchRoom(id);
  },

  computed: {
    tagsStyle() {
      return this.tags.map(tag => ({
        ...tag,
        style: {
          backgroundColor: tag.backgroundColor,
          top: tag.top,
          left: tag.left,
          height: tag.height,
          width: tag.width,
          position: tag.position,
        },
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
            this.roomInfos.push(data);
          }
        })
        .catch(() => {
          // ne marche pas...les erreurs sont attrapées dans le else if précédent...to fix

        });
    },
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
