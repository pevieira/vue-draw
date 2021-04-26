import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // Store is simple and focuses on the one action approach
  state: {
    color: '#000000',
    toolOption: 'draw',
  },
  mutations: {
    MAIN_MUTATION(state, payload) {
      state[payload.property] = payload.with
    },
  },
  actions: {
    mainAction: ({ commit }, payload) => {
      commit('MAIN_MUTATION', {
        property: payload.stateProperty,
        with: payload.with,
      })
    },
  },
  modules: {},
})
