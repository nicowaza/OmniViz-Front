// import router from '../router';
import { mapState } from 'vuex';
import HTTP from '../http';
import router from '../router';


export default {
  namespaced: true,
  state: {
    rooms: [],
    tags: [],
    registerConfirm: null,
  },

  actions: {
    fetchRooms({ commit }) {
      return HTTP().get('/rooms')
        .then(({ data }) => {
          commit('setRooms', data.results);
        });
    },

    fetchRoomsById({ commit }, roomID) {
      return HTTP().get(`/rooms/${roomID}`)
        .then(({ data }) => {
          console.log('results', data.results);
          commit('setRooms', data.results);
        });
    },
    // liste les cours par date de début du cours(plus récents en premier)
    fetchRoomsByDate({ commit }) {
      return HTTP().get('/rooms/startDate')
        .then(({ data }) => {
          commit('setRooms', data.results);
        });
    },

    // liste tous les cours de la journée
    fetchRoomsOfTheDay({ commit }) {
      return HTTP().get('/rooms/classOfTheDay')
        .then(({ data }) => {
          commit('setRooms', data.results);
        });
    },

    // liste uniquement les cours auquels à participé le user
    fetchMyRooms({ commit }, userID) {
      console.log(`/rooms/myRooms/${userID}`);
      return HTTP().get(`/rooms/myRooms/${userID}`)
        .then(({ data }) => {
          commit('setRooms', data.results);
        });
    },

    createRooms({ commit }, roomData) {
      console.log('room data', roomData);
      return HTTP().post('/rooms', {
        authorID: roomData.authorID,
        authorLastname: roomData.authorLastname,
        authorFirstname: roomData.authorFirstname,
        authorUsername: roomData.authorUsername,
        title: roomData.title,
        description: roomData.description,
        avatar: roomData.avatar,
        startClass: roomData.startClass,
        endClass: roomData.endClass,
      })
        .then(({ data }) => {
          if (data.status === 200 && data.success) {
            const confirmMessage = data.success;
            commit('setRegisterConfirm', confirmMessage);
            console.log('confirmMessage', confirmMessage);
            setTimeout(() => {
              commit('setRegisterConfirm', null);
            }, 3000);
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
    },

    socket_event({ commit }, data) {
      commit('SOCKET_EVENT', data);
    },
  },
  getters: {
  },

  mutations: {
    SOCKET_EVENT(state, tags) {
      state.tags = tags;
    },
    // setCurrentRooms(state, room) {
    //   state.currentRoom = room;
    // },
    // setNewProjectName(state, name) {
    //   state.newProjectName = name;
    // },
    appendRoom(state, room) {
      state.rooms.push(room);
    },
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
    setRegisterConfirm(state, message) {
      state.registerConfirm = message;
    },
    // setProjectTitle(state, { project, title }) {
    //   project.title = title;
    // },
    // setEditMode(state, project) {
    //   Vue.set(project, 'isEditMode', true);
    // },
    // unsetEditMode(state, project) {
    //   Vue.set(project, 'isEditMode', false);
    // },
    // removeProject(state, project) {
    //   state.projects.splice(state.projects.indexOf(project), 1);
    // },
  },
};
