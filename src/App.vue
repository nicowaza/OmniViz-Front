<template>
  <div id="app">
    <v-app >
      <transition name="fade">
        <alert-popup v-show="this.registerConfirm">
          <div slot="alert">{{ registerConfirm }} </div>
        </alert-popup>
      </transition>
      <HeaderBar/>
        <div class="pa-0 contentStyle">
          <router-view class="containerMain"/>
        </div>
      <BottomNav class="hidden-sm-and-up"/>
    </v-app>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import router from './router';
import HeaderBar from './components/Header.vue';
import BottomNav from './components/BottomNav.vue';
import isAuthenticated from './helpers/Auth';
import PopUp from './components/PopUp.vue';


export default {
  components: {
    HeaderBar,
    BottomNav,
    'alert-popup': PopUp,
  },
  // call pour vérifier si une session est toujours ouverte pour l'utilsateur
  beforeMount() {
    isAuthenticated()
      .then(({ data }) => {
        console.log(data);
        if (data.isAuthenticated === false) {
          router.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  computed: {
    ...mapState('authentication', [
      'registerConfirm',
    ]),
    ...mapState('rooms', [
      'registerConfirm',
    ]),
  },
};
</script>

<style lang="scss">

#app {
  font-family: 'Catamaran', sans-serif;
}
.contentStyle {
  height: 100%;
  background-color: #231846;
}
.containerMain {
  background-color: #28315a;
  height: 100%;
  width: 100vw;
  margin: auto;
  padding-top: 64px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media (min-width: 600px) {
  .containerMain {
    width: 70vw;
  }
}

@media (min-width: 900px) {
 .containerMain {
    width: 60vw;
  }
}

</style>
