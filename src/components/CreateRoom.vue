<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" width= "300px" height="70%">
      <template v-slot:activator="{ on }">
        <v-btn flat v-on="on">Create Class</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create your class</span>
        </v-card-title>
        <v-card-text>
          <v-form enctype="mutlipart/form-data">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="courseName" label="Name of the Course*" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea v-model="description" auto-grow box label="Description"></v-textarea>
                </v-flex>
                <!-- <v-flex xs12>
                  <div>
                    <label for="file" class="label"></label>
                    <input
                    style="display: none;"
                    type="file"
                    ref="imageUpload"
                    accept="image/*"
                    @change="onFileSelected">
                  </div>
                <v-btn @click="onChooseFile">Upload an image</v-btn>
                </v-flex> -->
                <v-flex>
                  <v-dialog
                    ref="dialog1"
                    v-model="modal1"
                    :return-value.sync="startDate"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="startDate"
                        label="Picker in dialog"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="startDate" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal1 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog1.save(startDate)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>

                  <v-dialog
                    ref="dialog2"
                    v-model="modal2"
                    :return-value.sync="startTime"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="startTime"
                        label="Picker in dialog"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="modal2"
                      v-model="startTime"
                      full-width
                      format="24hr"
                    >
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog2.save(startTime)">OK</v-btn>
                    </v-time-picker>
                  </v-dialog>
                  <div>Début du cours le {{ startDate }} à {{ startTime }}</div>
                </v-flex>
                <v-spacer></v-spacer>
                 <v-flex>
                  <v-dialog
                    ref="dialog3"
                    v-model="modal3"
                    :return-value.sync="endDate"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="endDate"
                        label="Picker in dialog"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="endDate" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal3 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog3.save(endDate)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>

                  <v-dialog
                    ref="dialog4"
                    v-model="modal4"
                    :return-value.sync="endTime"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="endTime"
                        label="Picker in dialog"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="modal4"
                      v-model="endTime"
                      full-width
                      format="24hr"
                    >
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal4 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog4.save(endTime)">OK</v-btn>
                    </v-time-picker>
                  </v-dialog>
                  <div>Fin du cours le {{ endDate }} à {{ endTime }}</div>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="submit">Save</v-btn>
              </v-card-actions>
              <v-alert v-if="this.Error"
                :value="true"
                type="error"
              >{{ this.Error }}
              </v-alert>
            </v-container>
            <small>*indicates required field</small>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {
  mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';
import moment from 'moment';
import HTTP from '../http';

export default {
  data: () => ({
    dialog: false,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    modal1: false,
    modal2: false,
    modal3: false,
    modal4: false,
    created_by: '',
    courseName: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    Error: '',
    createSuccess: '',
    selectedFile: null,
  }),

  computed: {
    ...mapState('authentication', [
      'user',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
      'isConnected',
    ]),
    ...mapMutations('authentication', [
      'SOCKET_CONNECT',
      'SOCKET_DISCONNECT',
    ]),
    ...mapActions('authentication', [
      'socket_connect',
      'socket_disconnect',
    ]),

  },

  methods: {
    // onChooseFile() {
    //   this.$refs.imageUpload.click();
    // },
    // onFileSelected(event) {
    //   const { files } = event.target;
    //   const filename = files[0].name;

    //   this.selectedFile = event.target.files[0];
    //   console.log('files', files);
    //   console.log('filename', filename);
    // },
    submit(isLoggedIn) {
    //   console.log('selectedFile', this.selectedFile);
    //   const formData = new FormData();
    //   formData.append('file', this.selectedFile);
    //   console.log('formData', formData);

      const startClass = moment(this.startDate + ' ' + this.startTime).format('X'); // moment().format(X) => transforme la date en secondes. Utiliser x pour la date en millisecondes
      const endClass = moment(this.endDate + ' ' + this.endTime).format('X');
      const timestamp = (Date.now() / 1000); // diviser par 1000 pour avoir la date en secondes (Date.now() la donne en millisecondes).
      console.log('timestamp', timestamp);
      if (endClass <= startClass) {
        this.Error = "l'horaire de fin du cours est antérieur au début du cours";
      } else if (startClass <= timestamp) {
        this.Error = 'la date de début de cours est déjà passée';
      } else if (isLoggedIn) {
        console.log('date', timestamp);
        HTTP().post('/rooms', {
          authorID: this.user.userID,
          authorLastname: this.user.lastname,
          authorFirstname: this.user.firstname,
          authorUsername: this.user.username,
          title: this.courseName,
          description: this.description,
          avatar: this.avatar,
          startClass,
          endClass,
        })
          .then(({ data }) => {
            if (data.status === 200 && data.success) {
              alert('class created');
              // this.createSuccess = 'Votre cours a bien été crée';
              console.log(data);
            } else if (data.status === 400) {
              const errorData = data.errors;
              const errorDataMsg = errorData.map((e) => {
                return e.msg;
              });
              this.Error = errorDataMsg;
            }
          })
          .catch(() => {
            // ne marche pas...les erreurs sont attrapées dans le else if précédent...to fix

          });

        this.$socket.open();
        console.log('opening socket');
        this.dialog = false;
        this.$socket.emit('createRoom', {
          created_by: this.user.userID,
          room: this.courseName,
          description: this.description,
          timestamp,
          startClass,
          endClass,
        });

        this.$router.push('/rommsList');
      } else console.log('unauthorized');
      this.$router.push('/about');
    },
  },
};
</script>

<style>

</style>
