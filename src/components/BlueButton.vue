<template>
  <div>
    <div class="button btnBlue textAlign">{{ this.tags.username }} has a question</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BlueBtn',

  computed: {
    ...mapState('rooms', [
      'tags',
    ]),
  },
  data() {
    return {

    };
  },

};


</script>

<style>
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
.textAlign {
  display: flex; /* contexte sur le parent */
  flex-direction: column; /* direction d'affichage verticale */
  justify-content: center; /* alignement vertical */
}
.btnBlue {
  background-color: blue;
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
