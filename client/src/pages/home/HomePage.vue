<template>
  <div>
    <the-header :user="username"></the-header>
    <popular-blogs :popular="popularBlogs"></popular-blogs>
    <!-- <div class="first-section-gray-card">
      <div class="card-image" :style="{ background: `url('${img}')` }"></div>
      <div class="card-text-holder">
        <p class="card-text">{{ test }}</p>
        <p class="card-author">by xx in News</p>
      </div>
    </div> -->
    <blog-list :blogs="blogs"></blog-list>
  </div>
</template>

<script>
import axios from 'axios';
// import { computed } from 'vue';
import BlogList from '../../components/BlogList.vue';
import TheHeader from '../../components/layout/TheHeader.vue';
import PopularBlogs from '../../components/PopularBlogs.vue';

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
          this.username = res.data.data[0].username;
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
        // this.test = this.popularBlogs[2].title;
        // this.photo = this.popularBlogs[2].cover_photo;
        // this.img = 'http://localhost:5000/' + this.photo;
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
      // test: '',
      // photo: '',
      // img: '',
    };
  },
  methods: {},
  components: { BlogList, TheHeader, PopularBlogs },
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
.first-section-gray-card {
  width: 210px;
  background: #ffffff70;
  margin: 13px;
  display: flex;
  flex-direction: column;
  border: 1px groove;
  transition: 0.5s ease;
  /* backface-visibility: hidden; */
}
.first-section-gray-card:hover {
  cursor: pointer;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.first-section-gray-card p {
  margin: 16px 10px;
}
.card-text {
  font-weight: 600;
  color: #2b282c;
}
.card-text:hover {
  text-decoration: underline solid rgba(0, 0, 0, 0.699) 1px;
  text-underline-position: under;
}
.card-author {
  margin-top: 0;
  font-size: 10px;
}
.card-image {
  width: 100%;
  min-height: 150px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* .card-image-1 {
  background-image: url(./assets/acer-laptop-aspire-7-The-Connectivity-KSP-6_s.jpg);
}*/
.card-text-holder {
  background-color: #ffffff70;
  flex: auto;
}
</style>
