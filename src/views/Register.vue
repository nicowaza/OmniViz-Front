<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>Register</h1>

        <v-text-field v-model="email"
          label="Enter an email"
          placeholder="Email"
        ></v-text-field>

        <v-text-field v-model="username"
          label="Enter a username"
          placeholder="Username"
        ></v-text-field>

        <v-text-field v-model="firstname"
          label="Entre your firstname"
          placeholder="Firstname"
        ></v-text-field>

        <v-text-field v-model="lastname"
          label="Entre your lastname"
          placeholder="Lastname"
        ></v-text-field>

        <v-text-field v-model="university"
          label="Enter your university"
          placeholder="University"
        ></v-text-field>

        <v-text-field v-model="role"
          label="Enter your status"
          placeholder="Status"
        ></v-text-field>

        <v-text-field v-model="password"
          label="Enter your password"
          placeholder="Password"
          type="password"
        ></v-text-field>

        <v-text-field v-model="confirmedPassword"
          label="Confirm your password"
          placeholder="Password"
          type="password"
        ></v-text-field>

        <!-- <v-alert type="error" :value="loginError">
          {{loginError}}
        </v-alert> -->

        <v-btn color="green" dark @click="register()">
          <v-icon class="mr-2">fingerprint</v-icon>
          Register
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from 'axios';
import HTTP from '../http';

export default {
  name: 'register',
  data() {
    return {
      email: '',
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmedPassword: '',
      avatarUrl: '',
      university: '',
      role: '',
    };
  },
  methods: {
    register() {
      const body = {
        email: this.email,
        username: this.username,
        password: this.password,
        confirmedPassword: this.confirmedPassword,
        firstname: this.firstname,
        lastname: this.lastname,
        avatarUrl: this.avatarUrl,
        university: this.university,
        role: this.role,
      };

      return HTTP().post('/users', body)
        .then((res) => {
          if (res.status === 200 && res.data.success) {
            alert('user created');
            console.log(res.data.content);
          }
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
