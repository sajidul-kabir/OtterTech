import { createStore } from 'vuex';
const store = createStore({
  state() {
    return {
      username: '',
    };
  },
  mutations: {
    change(state, newUserName) {
      state.username = newUserName;
    },
  },
});

export default store;
