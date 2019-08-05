<template>
  <v-container>
    <v-layout row wrap style= "height: auto;">
      <v-flex style= "margin-top: 10vh; margin-bottom: 5vh;" xs8 offset-xs2>
        <h1>Register</h1>
        <br>
        <form autocomplete="off">
          <v-text-field
          class="elevation-24"
          label="Enter your email"
          :value="registerEmail"
          @input="setRegisterEmail"
          ></v-text-field>
          <br>
          <v-text-field
            class="elevation-24"
            label="Enter a username"
            :value="registerUsername"
            @input="setRegisterUsername"
          ></v-text-field>
          <br>
          <v-text-field
            class="elevation-24"
            label="Entre your firstname"
            :value="registerFirstname"
            @input="setRegisterFirstname"
          ></v-text-field>
          <br>
          <v-text-field
            class="elevation-24"
            label="Entre your lastname"
            :value="registerLastname"
            @input="SetRegisterLastname"
          ></v-text-field>
          <br>
          <v-text-field
            class="elevation-24"
            label="Enter your university"
            :value="registerUniversity"
            @input="setRegisterUniversity"
          ></v-text-field>
          <br>
          <v-text-field
            class="elevation-24"
            label="Enter your status"
            :value="registerRole"
            @input="setRegisterRole"
          ></v-text-field>
          <br>
          <!-- <v-text-field
            class="elevation-24"
            label="Enter your avatar"
            :value="registerAvatar"
            @input="setRegisterAvatar"
          >{{ selectedFile }}</v-text-field> -->
          <br>
          <div>
            <label for="file" class="label"></label>
            <input
            style="display: none;"
            type="file"
            ref="imageUpload"
            accept="image/*"
            @change="onFileSelected"
            @input="setRegisterAvatar"
            >
          </div>
          <v-btn @click="onChooseFile">Upload an image</v-btn>
          <br>
          <v-text-field
            class="elevation-24"
            label="Enter your password"
            type="password"
            :value="registerPassword"
            @input="setRegisterPassword"
          ></v-text-field>
          <br>
          <v-text-field
            class="elevation-24"
            label="Confirm your password"
            type="password"
            :value="registerConfirmedPassword"
            @input="setRegisterConfirmedPassword"
          ></v-text-field>
          <br>
          <div class=center>
            <v-btn dark @click="register()">
            <v-icon class="mr-2">fingerprint</v-icon>
            Register
            </v-btn>
          </div>
        </form>
        <br>
        <br>
        <div v-for="registerError in registerErrors" :key="registerError.id">
          <v-alert type="error">
            {{ registerError }}
          </v-alert>
        </div>


      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'register',
  data: () => ({
    selectedFile: null,
  }),

  computed: {
    ...mapState('authentication', [
      'registerEmail',
      'registerUsername',
      'registerPassword',
      'registerConfirmedPassword',
      'registerFirstname',
      'registerLastname',
      'registerAvatar',
      'registerUniversity',
      'registerRole',
      'registerErrors',
    ]),
  },
  methods: {

    // implémenter l'upload de l'img dans le store authentication !!
    onChooseFile() {
      this.$refs.imageUpload.click();
    },
    onFileSelected(event) {
      const { files } = event.target;
      console.log('files', files);
      const filename = files[0].name;
      console.log('filename', filename);
      this.selectedFile = filename;
      console.log('this selected', this.selectedFile);
    },
    ...mapMutations('authentication', [
      'setRegisterEmail',
      'setRegisterPassword',
      'setRegisterConfirmedPassword',
      'setRegisterUsername',
      'setRegisterFirstname',
      'SetRegisterLastname',
      'setRegisterAvatar',
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

<style scoped lang="scss">
  h1 {
    color: map-get($colors, custom-pink);
    text-align: center;
  }
  .theme--dark.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  @include submitBtn()
  }
  .v-text-field {
    padding-left: 10px;
    padding-right: 10px;
  }
  .v-input {
    @include formInputBox()
  }
  .primary--text {
    color:map-get($colors, dark-purple) !important;
    caret-color:map-get($colors, dark-purple)!important;
  }
  .v-alert {
    border-radius: $radius-default;
    border-width: 0;
  }
  .center {
    @include flexCenter()
  }
</style>
