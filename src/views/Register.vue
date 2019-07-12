<template>
  <v-container>
    <v-layout row wrap style= "height: auto;">
      <v-flex style= "margin-top: 10vh;height: 100vh;" xs6 offset-xs3>
        <h1>Register</h1>
        <form autocomplete="off">
          <v-text-field
          label="Enter an email"
          placeholder="Email"
          :value="registerEmail"
          @input="setRegisterEmail"
          ></v-text-field>

          <v-text-field
            label="Enter a username"
            placeholder="Username"
            :value="registerUsername"
            @input="setRegisterUsername"
          ></v-text-field>

          <v-text-field
            label="Entre your firstname"
            placeholder="Firstname"
            :value="registerFirstname"
            @input="setRegisterFirstname"
          ></v-text-field>

          <v-text-field
            label="Entre your lastname"
            placeholder="Lastname"
            :value="registerLastname"
            @input="SetRegisterLastname"
          ></v-text-field>

          <v-text-field
            label="Enter your university"
            placeholder="University"
            :value="registerUniversity"
            @input="setRegisterUniversity"
          ></v-text-field>

          <v-text-field
            label="Enter your status"
            placeholder="Role"
            :value="registerRole"
            @input="setRegisterRole"
          ></v-text-field>

          <v-text-field
            label="Enter your password"
            placeholder="Password"
            type="password"
            :value="registerPassword"
            @input="setRegisterPassword"
          ></v-text-field>

          <v-text-field
            label="Confirm your password"
            placeholder="Password"
            type="password"
            :value="registerConfirmedPassword"
            @input="setRegisterConfirmedPassword"
          ></v-text-field>

        </form>

        <div v-for="errorDataMsg in registerErrors" :key="errorDataMsg.id">
          <v-alert type="error">
            {{ errorDataMsg }}
          </v-alert>
        </div>

        <v-btn color="green" dark @click="register()">
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
    ]),
    ...mapActions('authentication', [
      'register',
    ]),
  },
};
</script>
