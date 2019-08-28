<template>
  <v-container>
    <v-layout row wrap style= "height: auto;">
      <v-flex style= "margin-top: 14vh; margin-bottom: 5vh;" xs6 offset-xs3>
        <h1>Register</h1>
        <br>
        <v-form
        autocomplete="off"
        ref="form1"
        v-show="step === 1"
        v-model="valid"
        lazy-validation
        >
          <v-text-field
          class="elevation-24"
          label="Enter your email*"
          :value="registerEmail"
          @input="setRegisterEmail"
          v-model="email"
          :rules="emailRules"
          required
          ></v-text-field>
          <br>
          <v-text-field
            class="elevation-24"
            label="Enter a username*"
            :value="registerUsername"
            @input="setRegisterUsername"
            v-model="username"
            :rules="usernameRules"
            required
          ></v-text-field>
          <br>
          <br>
          <div style="display: flex; justify-content: flex-end">
             <v-btn dark @click.prevent="next1()">Next</v-btn>
          </div>
        </v-form>
        <v-form
          v-show="step === 2"
          ref="form2"
          v-model="valid"
          lazy-validation
        >
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
          <br>
          <div style="display: flex; justify-content: space-between">
            <v-btn dark @click.prevent="prev()">Previous</v-btn>
            <v-btn dark @click.prevent="next2()">Next</v-btn>
          </div>
        </v-form>
        <v-form
          v-show="step === 3"
          ref="form3"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            class="elevation-24"
            label="Enter your university"
            :value="registerUniversity"
            @input="setRegisterUniversity"
          ></v-text-field>
          <br>
          <v-select
            :items="role"
            label="Enter your status*"
            :value="registerRole"
            @input="setRegisterRole"
            :rules="[v => !!v || 'Role is required']"
            required
          ></v-select>
          <br>
          <br>
          <div style="display: flex; justify-content: space-between">
            <v-btn  dark @click.prevent="prev()"
            >Previous</v-btn>
            <v-btn
              @click.prevent="next3()"
              dark
            >Next
            </v-btn>
          </div>
        </v-form>
        <v-form
          v-show="step === 4"
          ref="form4"
          v-model="valid"
          lazy-validation
        >
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
          <br>
          <div style="display: flex; justify-content: space-between">
            <v-btn dark @click.prevent="prev()">Previous</v-btn>
            <v-btn
            dark
            :disabled="!valid"
            @click="validate()">
            <v-icon class="mr-2">fingerprint</v-icon>
            Register
            </v-btn>
          </div>
        </v-form>

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
          <!-- <br>

          <br>
          <small style="color: #f6f6e5;">*indicates required field</small>
          <br> -->

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
    step: 1,
    selectedFile: null,
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
    role: ['student', 'teacher'],
    password: '',
    passwordRules: [
      v => !!v || 'password is required',
      v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/.test(v) || 'Your Password must include one lowercase character, one uppercase character, one number, and one special character',
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
    prev() {
      this.step--;
    },
    next1() {
      if (this.$refs.form1.validate()) {
        this.step++;
      }
    },
    next2() {
      if (this.$refs.form2.validate()) {
        this.step++;
      }
    },
    next3() {
      if (this.$refs.form3.validate()) {
        this.step++;
      }
    },
    validate() {
      if (this.$refs.form4.validate()) {
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
