import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clases: [],
  },
  mutations: {
    setClases(state, clases) {
      state.clases = clases;
    }
  },
  actions: {
    getClases({commit}) {
      axios.get('/clas')
        .then(response => {
          if (response.data.status) {
            commit('setClases', response.data.data);
          } else {
            console.log(error);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
})
