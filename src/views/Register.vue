<template>
  <v-container>
    <v-layout row wrap style= "height: auto;">
      <v-flex style= "margin-top: 10vh;height: 100vh;" xs6 offset-xs3>
        <h1>Register</h1>
        <br>
        <form autocomplete="off">
          <v-text-field
          class="elevation-18"
          label="Enter your email"
          :value="registerEmail"
          @input="setRegisterEmail"
          ></v-text-field>
          <br>
          <v-text-field
            label="Enter a username"
            :value="registerUsername"
            @input="setRegisterUsername"
          ></v-text-field>
          <br>
          <v-text-field
            label="Entre your firstname"
            :value="registerFirstname"
            @input="setRegisterFirstname"
          ></v-text-field>
          <br>
          <v-text-field
            label="Entre your lastname"
            :value="registerLastname"
            @input="SetRegisterLastname"
          ></v-text-field>
          <br>
          <v-text-field
            label="Enter your university"
            :value="registerUniversity"
            @input="setRegisterUniversity"
          ></v-text-field>
          <br>
          <v-text-field
            label="Enter your status"
            :value="registerRole"
            @input="setRegisterRole"
          ></v-text-field>
          <br>
          <v-text-field
            label="Enter your password"
            type="password"
            :value="registerPassword"
            @input="setRegisterPassword"
          ></v-text-field>
          <br>
          <v-text-field
            label="Confirm your password"
            type="password"
            :value="registerConfirmedPassword"
            @input="setRegisterConfirmedPassword"
          ></v-text-field>
        </form>

        <div v-for="registerError in registerErrors" :key="registerError.id">
          <v-alert type="error">
            {{ registerError }}
          </v-alert>
        </div>

        <v-btn dark @click="register()">
          <v-icon class="mr-2">fingerprint</v-icon>
          Register
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'register',
  computed: {
    ...mapState('authentication', [
      'registerEmail',
      'registerUsername',
      'registerPassword',
      'registerConfirmedPassword',
      'registerFirstname',
      'registerLastname',
      'registerAvatarUrl',
      'registerUniversity',
      'registerRole',
      'registerErrors',
    ]),
  },
  methods: {
    ...mapMutations('authentication', [
      'setRegisterEmail',
      'setRegisterPassword',
      'setRegisterConfirmedPassword',
      'setRegisterUsername',
      'setRegisterFirstname',
      'SetRegisterLastname',
      'setRegisterAvatarUrl',
      'setRegisterUniversity',
      'setRegisterRole',
      'setRegisterErrors',
    ]),
    ...mapActions('authentication', [
      'register',
    ]),
  },
};
</script>

<style lang="scss">
  h1 {
    color: map-get($colors, custom-pink);
    text-align: center;
  }
  .theme--dark.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  @include submitBtn()
  }
  .v-input__control {
    padding: 0 5px;
  }
  .v-input {
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
