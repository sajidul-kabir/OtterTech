<template>
  <h1>HOME</h1>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  mounted() {
    axios
      .get('http://localhost:5000/api/users/me')
      .then((res) => {
        console.log(res.data.data[0].username);
        if (res.data.message === 'NOT LOGGED IN') {
          this.$router.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
