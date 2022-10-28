import axios from 'axios';
export default {
  namespaced: true,
  state: {
    username: null,
    token: null,
  },
  getters: {
    authenticated(state) {
      if (state.token && state.username) {
        return true;
      } else {
        return false;
      }
    },
    user(state) {
      return state.username;
    },
  },
  mutations: {
    // change(state, newUserName) {
    //   state.username = newUserName;
    // },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.username = data;
    },
  },
  actions: {
    async signIn({ dispatch }, credentials) {
      // axios
      // .post('http://localhost:5000/api/users/login', this.user)
      // .then(() => {
      //   this.$router.push('/');
      // })
      // .catch((err) => {
      //   console.log(err.response.data.message);
      //   if (err.response.data.message === 'Invalid username') {
      //     this.wrongUser = true;
      //   }
      //   if (err.response.data.message === 'Wrong Password') {
      //     this.wrongPass = true;
      //   }
      // });

      let response = await axios.post(
        'http://localhost:5000/api/users/login',
        credentials
      );
      return dispatch('attempt', response.data.accessToken);
      //console.log(response.data);
    },
    async attempt({ commit }, token) {
      commit('SET_TOKEN', token);

      try {
        let response = await axios.get('http://localhost:5000/api/users/me');
        //console.log(response.data.data[0].username);
        commit('SET_USER', response.data.data[0].username);
      } catch (e) {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
      }
    },
  },
};
