// import router from '../router';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    rooms: [],
  },

  // sockets: {
  //   roomCreation(data, { commit }) {
  //     console.log(data);
  //     commit('setRooms', data);
  //   },
  // },

  actions: {
    // saveProject({ commit }, project) {
    //   return HTTP().patch(`projects/${project.id}`, project)
    //     .then(() => {
    //       commit('unsetEditMode', project);
    //     });
    // },
    // deleteProject({ commit }, project) {
    //   return HTTP().delete(`projects/${project.id}`)
    //     .then(() => {
    //       commit('removeProject', project);
    //     });
    // },
    fetchRooms({ commit }) {
      return HTTP().get('/rooms')
        .then(({ data }) => {
          commit('setRooms', data.results);
          // console.log('this state room[0]', data.result[1]);
        });
    },
    // createProject({ commit, state }) {
    //   return HTTP().post('/projects', {
    //     title: state.newProjectName,
    //   })
    //     .then(({ data }) => {
    //       commit('appendProject', data);
    //       commit('setNewProjectName', null);
    //     });
    // },
  },
  getters: {
  },
  mutations: {
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
