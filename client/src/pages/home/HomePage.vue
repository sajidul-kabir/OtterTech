<template>
  <div>
    <the-header :user="username" :photo="photo"></the-header>
    <popular-blogs :popular="popularBlogs"></popular-blogs>
    <blog-list :blogs="blogs"></blog-list>
    <the-footer></the-footer>
  </div>
</template>

<script>
import axios from 'axios';
import BlogList from '../../components/BlogList.vue';
import TheHeader from '../../components/layout/TheHeader.vue';
import PopularBlogs from '../../components/PopularBlogs.vue';
import TheFooter from '../../components/layout/TheFooter.vue';
//import store from '../../store';

axios.defaults.withCredentials = true;

export default {
  beforeCreate() {
    axios
      .get('http://localhost:5000/api/users/me')
      .then((res) => {
        if (res.data.message === 'NOT LOGGED IN') {
          this.$router.push('/login');
        } else {
          //console.log(res.data.data[0].username);
          if (res.data.data[0].user_photo) {
            this.photo = res.data.data[0].user_photo;
          }
          // this.username = res.data.data[0].username;
          // window.localStorage.setItem('username', this.username);

          //store.state.username = this.username;

          this.$store.commit('change', res.data.data[0].username);
          console.log(this.$store.state.username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  created() {
    axios
      .get('http://localhost:5000/api/blogs/most-popular')
      .then((res) => {
        this.popularBlogs = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
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
      popularBlogs: [],
      username: '',
      photo: null,
    };
  },
  // provide() {
  //   return {
  //     username: this.username,
  //   };
  // },
  components: { BlogList, TheHeader, PopularBlogs, TheFooter },
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
