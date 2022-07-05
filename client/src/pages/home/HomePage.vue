<template>
  <blog-list :blogs="blogs"></blog-list>
</template>

<script>
import axios from 'axios';
import BlogList from '../../components/BlogList.vue';

axios.defaults.withCredentials = true;

export default {
  beforeCreate() {
    axios
      .get('http://localhost:5000/api/users/me')
      .then((res) => {
        if (res.data.message === 'NOT LOGGED IN') {
          this.$router.push('/login');
        } else {
          console.log(res.data.data[0].username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    axios
      .get('http://localhost:5000/api/blogs')
      .then((res) => {
        this.blogs = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      blogs: [],
    };
  },
  components: { BlogList },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: 'Inter', sans-serif;
  font-family: 'Lora', serif;
  margin: 0;
}
</style>
