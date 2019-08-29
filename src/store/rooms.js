// import router from '../router';
import HTTP from '../http';
import router from '../router';

export default {
  namespaced: true,
  state: {
    rooms: [],
    tags: [],
  },

  // sockets: {
  //   roomCreation(data, { commit }) {
  //     console.log(data);
  //     commit('setRooms', data);
  //   },
  // },

  actions: {

    fetchRooms({ commit }) {
      return HTTP().get('/rooms')
        .then(({ data }) => {
          if (data.status === 401) {
            alert("You're session has expired. Please Login again");
            router.push('/login');
          } else {
            commit('setRooms', data.results);
          }
        });
    },

    fetchRoomsById({ commit }, roomID) {
      return HTTP().get(`/rooms/${roomID}`)
        .then(({ data }) => {
          console.log('results', data.results);
          if (data.status === 401) {
            alert("You're session has expired. Please Login again");
            router.push('/login');
          } else {
            commit('setRooms', data.results);
          }
        });
    },
    // liste les cours par date de début du cours(plus récents en premier)
    fetchRoomsByDate({ commit }) {
      return HTTP().get('/rooms/startDate')
        .then(({ data }) => {
          if (data.status === 401) {
            alert("You're session has expired. Please Login again");
            router.push('/login');
          } else {
            commit('setRooms', data.results);
          }
        });
    },

    // liste tous les cours de la journée
    fetchRoomsOfTheDay({ commit }) {
      return HTTP().get('/rooms/classOfTheDay')
        .then(({ data }) => {
          if (data.status === 401) {
            alert("You're session has expired. Please Login again");
            router.push('/login');
          } else {
            commit('setRooms', data.results);
          }
        });
    },

    // liste uniquement les cours auquels à participé le user
    fetchMyRooms({ commit }, userID) {
      console.log(`/rooms/myRooms/${userID}`);
      return HTTP().get(`/rooms/myRooms/${userID}`)
        .then(({ data }) => {
          if (data.status === 401) {
            alert("You're session has expired. Please Login again");
            router.push('/login');
          }
          commit('setRooms', data.results);
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
