<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <h1>Register</h1>

        <v-text-field v-model="username"
          label="username"
          placeholder="Username"
        ></v-text-field>

        <v-text-field v-model="firstname"
          label="firstname"
          placeholder="Firstname"
        ></v-text-field>

        <v-text-field v-model="lastname"
          label="lastname"
          placeholder="Lastname"
        ></v-text-field>

        <v-text-field v-model="university"
          label="university"
          placeholder="University"
        ></v-text-field>

        <v-text-field v-model="role"
          label="role"
          placeholder="Role"
        ></v-text-field>

        <v-text-field v-model="password"
          label="password"
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
import axios from 'axios';

export default {
  name: 'register',
  data() {
    return {
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      avatarUrl: '',
      university: '',
      role: '',
    };
  },
  methods: {
    register() {
      const body = {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        avatarUrl: this.avatarUrl,
        university: this.university,
        role: this.role,
      };

      axios.post('http://localhost:5000/users', body)
        .then((res) => {
          if (res.status === 200 && res.data.success) {
            alert('user created');
            console.log(res.data.content);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.push('/login');
    },
  },
};
</script>
