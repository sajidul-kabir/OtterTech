<template>
  <form @submit.prevent="registerUser">
    <input
      type="text"
      name="username"
      id="username"
      placeholder="username"
      v-model="user.username"
    />
    <input
      type="text"
      name="fullname"
      id="fullname"
      placeholder="fullname"
      v-model="user.fullname"
    />
    <input
      type="email"
      name="email"
      id="email"
      placeholder="email"
      v-model="user.email"
    />
    <input
      type="password"
      name="password"
      id="pass"
      placeholder="password"
      v-model="user.password"
    />
    <button>Register</button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: {
        username: '',
        fullname: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    registerUser() {
      axios
        .post('http://localhost:5000/api/users/signup', this.user)
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
