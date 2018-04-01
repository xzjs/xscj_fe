import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clases: [],
    students: [],
    courses: [],
    user: {
      id: '',
      type: ''
    },
    grades:[]
  },
  mutations: {
    setClases(state, clases) {
      state.clases = clases;
    },
    setStudents(state, students) {
      state.students = students;
    },
    setCourses(state, courses) {
      state.courses = courses;
    },
    setUser(state, user) {
      state.user = user;
    },
    setGrades(state, grades) {
      state.grades = grades;
    },
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
    },

    getStudents({commit}) {
      axios.get('/students')
        .then(response => {
          if (response.data.status) {
            commit('setStudents', response.data.data);
          } else {
            console.log(response.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getCourses({commit}, query_str='') {
      axios.get("/courses" + query_str)
        .then(response => {
          if (response.data.status) {
            commit('setCourses', response.data.data);
          } else {
            console.log(response.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getGrades({commit},query_str=''){
      axios.get("/grades" + query_str)
        .then(response => {
          if (response.data.status) {
            commit('setGrades', response.data.data);
          } else {
            console.log(response.data.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
})
