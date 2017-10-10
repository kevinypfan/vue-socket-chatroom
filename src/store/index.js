import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
    user: null,
    users: []
  },
  mutations: {
    SOCKET_CONNECT(state) {
      state.isConnected = true;
    },

    SOCKET_DISCONNECT(state) {
      state.isConnected = false;
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_USERS (state, payload) {
      state.users = payload
    }
  },
  actions: {
    socket_updateUserList ({commit}, payload) {
      commit('SET_USERS', payload)
    }
  },
  getters: {
    isHasUser (state) {
      return state.user !== null && state.user !== undefined
    },
    getUsers (state) {
      return state.users;
    }
  }
})
