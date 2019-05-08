<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent min-width= "300px" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn flat v-on="on">Create Class</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create your class</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="username" label="Username*" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="courseName" label="Name of the Course*" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea v-model="description" auto-grow box label="Description"></v-textarea>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="submit">Save</v-btn>
              </v-card-actions>
            </v-container>
            <small>*indicates required field</small>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default {
  data: () => ({
    dialog: false,
    username: '',
    courseName: '',
    description: '',
  }),

  methods: {
    submit() {
      this.dialog = false;
      socket.emit('join', {
        username: this.username,
        room: this.courseName,
        description: this.description,
      });
      this.$router.push('/');
    },
  },
};
</script>

<style>

</style>
