import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
const store = createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    username: null,
  },
  getters: {
    get(state) {
      return state;
    },
  },
  mutations: {
    change(state, newUserName) {
      state.username = newUserName;
    },
  },
  // actions:{
  //   change(context,username){

  //   }
  // }
});

export default store;
