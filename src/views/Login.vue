<template>
  <div>
    <v-layout row wrap style= "height: auto;">
      <v-flex style= "margin-top: 25vh;" xs6 offset-xs3>
        <h1>Login</h1>
        <br>
        <form action=""
        autocomplete="off"
        >
          <v-card :elevation="24">
            <v-text-field

            label="Email"
            :value="loginEmail"
            @input="setLoginEmail"
            ></v-text-field>
          </v-card>

          <br>
          <br>
          <v-card :elevation="24">
            <v-text-field
            label="Password"
            type="password"
            autocomplete="new-password"
            :value="loginPassword"
            @input="setLoginPassword"
            ></v-text-field>
          </v-card>
        </form>
        <br>
        <br>
        <div class=center>
          <v-btn class="submitBtn" dark @click="login">
          <v-icon class="mr-2">fingerprint</v-icon>
          Login
          </v-btn>
        </div>

        <br>
        <br>
        <v-alert type="error" :value="loginError">
          {{loginError}}
        </v-alert>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex';
// import '../../public/style.scss';

export default {
  name: 'login',
  computed: {
    ...mapState('authentication', [
      'loginEmail',
      'loginPassword',
      'loginError',
    ]),
  },

  methods: {
    ...mapMutations('authentication', [
      'setLoginEmail',
      'setLoginPassword',
      'setIsLoggedIn',
    ]),
    ...mapActions('authentication', [
      'login',
      'socket_connect',
      // comment passer 2 actions dans le même v-on ??
    ]),
  },
};
</script>

<style scoped lang="scss">
// @import "../scss/style.scss";
  h1 {
    color: map-get($colors, custom-pink);
    text-align: center;
  }
  .theme--dark.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  @include submitBtn()
  }
  // .v-input__control {
  //   padding: 0 10px;
  // }
  .v-text-field {
    padding-left: 10px;
    padding-right: 10px;
  }
  .theme--light.v-sheet {
    @include formInputBox()
  }
  .primary--text {
    color:map-get($colors, dark-purple) !important;
    caret-color:map-get($colors, dark-purple) !important;
  }
  .v-alert {
    border-radius: $radius-default;
    border-width: 0;
  }
  .center {
    @include flexCenter()
  }
</style>
