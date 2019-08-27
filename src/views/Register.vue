<template>
  <v-container>
    <v-layout row wrap style= "height: auto;">
      <v-flex style= "margin-top: 10vh; margin-bottom: 5vh;" xs8 offset-xs2>
        <h1>Register</h1>
        <br>
        <v-form
        autocomplete="off"
        ref="form"
        v-model="valid"
        lazy-validation
        >
          <v-text-field
          v-model="email"
          class="elevation-24"
          label="Enter your email*"
          :value="registerEmail"
          @input="setRegisterEmail"
          :rules="emailRules"
          required
          ></v-text-field>
          <br>
          <v-text-field
            v-model="username"
            class="elevation-24"
            label="Enter a username*"
            :value="registerUsername"
            @input="setRegisterUsername"
            :rules="usernameRules"
            required
          ></v-text-field>
          <br>
          <v-text-field
            class="elevation-24"
            label="Enter your firstname"
            :value="registerFirstname"
            @input="setRegisterFirstname"
          ></v-text-field>
          <br>
          <v-text-field
            class="elevation-24"
            label="Enter your lastname"
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
          <v-select
            :items="role"
            class="elevation-24"
            label="Enter your status*"
            :value="registerRole"
            @input="setRegisterRole"
            :rules="[v => !!v || 'Role is required']"
            required
          ></v-select>
          <br>
          <!-- <div>
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
          <v-btn @click="onChooseFile">Upload an image</v-btn> -->
          <br>
          <v-text-field
            v-model="password"
            class="elevation-24"
            label="Enter your password*"
            type="password"
            :value="registerPassword"
            @input="setRegisterPassword"
            :rules="passwordRules"
            required
          ></v-text-field>
          <br>
          <v-text-field
            class="elevation-24"
            label="Confirm your password*"
            type="password"
            :value="registerConfirmedPassword"
            @input="setRegisterConfirmedPassword"
            v-model="confirmedPassword"
            :rules="[passwordConfirmationRule]"
            required
          ></v-text-field>
          <br>
          <small style="color: #f6f6e5;">*indicates required field</small>
          <br>
          <div class=center>
            <v-btn
            dark
            :disabled="!valid"
            @click="validate()">
            <v-icon class="mr-2">fingerprint</v-icon>
            Register
            </v-btn>
          </div>
        </v-form>
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
    role: ['student', 'teacher'],
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    username: '',
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length >= 5) || 'Username must be at least 5 characters',
      v => (v && v.length <= 20) || 'Username must be less than 20 characters',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'password is required',
      v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/.test(v) || 'Your Password must include at least one lowercase character, one uppercase character, one number, and one special character',
      v => (v && v.length >= 8) || 'Password must be at least 8 characters',
      v => (v && v.length <= 50) || 'Password must be less than 50 characters',
    ],
    confirmedPassword: '',
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
    passwordConfirmationRule() {
      return () => (this.password === this.confirmedPassword) || 'Passwords must match';
    },
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
    validate() {
      if (this.$refs.form.validate()) {
        this.register();
      }
    },
  },
};
</script>

<style scoped lang="scss">
  h1 {
    @include formTitle();
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
