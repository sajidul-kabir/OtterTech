import { createStore } from 'vuex';
import auth from './auth';

const store = createStore({
  state: {
    // return {
    //   username: '',
    // };
  },
  getters: {
    // get(state) {
    //   return state;
    // },
  },
  mutations: {
    // change(state, newUserName) {
    //   state.username = newUserName;
    // },
  },
  modules: {
    auth,
  },
});

export default store;
