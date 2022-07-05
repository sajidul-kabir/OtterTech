<template>
  <div>
    <form @submit.prevent="loginUser">
      <input
        type="text"
        name="username"
        id="username"
        placeholder="username"
        v-model="user.username"
      />
      <input
        type="password"
        name="password"
        id="pass"
        placeholder="password"
        v-model="user.password"
      />
      <button>Login</button>
    </form>
    <p><router-link to="/register">Register</router-link> instead</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    loginUser() {
      axios
        .post('http://localhost:5000/api/users/login', this.user)
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
