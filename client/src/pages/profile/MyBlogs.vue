<template>
  <TheHeader></TheHeader>
  <ModifiedNav></ModifiedNav>

  <div class="content-holder">
    <div class="author-section">
      <div
        v-if="photo"
        class="author-section--img extra-img"
        :style="{ backgroundImage: `url('${path}${photo}')` }"
      ></div>
      <div v-else class="author-section--img"></div>
      <p class="author-section--info">Author {{ username }}</p>
      <p style="font-weight: 600">Total: {{ total }}</p>
    </div>
    <div class="section-2">
      <div class="section-2-purple"></div>
      <h1 class="section-2-header">My Blogs</h1>
      <div style="border-top: 1px solid #dedede"></div>
      <div>
        <ul class="section-2-posts">
          <blog-list-item
            v-for="blog in blogs"
            :key="blog.id"
            :id="blog.id"
            :title="blog.title"
            :blog="blog.blog"
            :user="blog.username"
            :coverPhoto="blog.cover_photo"
          ></blog-list-item>
        </ul>
      </div>
    </div>
  </div>

  <the-footer></the-footer>
</template>

<script>
import axios from 'axios';
import BlogListItem from '../../components/BlogListItem.vue';
import TheHeader from '../../components/layout/TheHeader.vue';
import TheFooter from '../../components/layout/TheFooter.vue';
import ModifiedNav from '../../components/layout/ModifiedNav.vue';
export default {
  created() {
    axios
      .get('http://localhost:5000/api/blogs/me')
      .then((res) => {
        this.blogs = res.data.data;
        this.total = this.blogs.length;
        //console.log(this.blogs);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get('http://localhost:5000/api/users/me')
      .then((res) => {
        //console.log(res.data.data);
        this.username = res.data.data[0].username;
        this.photo = res.data.data[0].user_photo;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      blogs: [],
      total: 0,
      username: '',
      photo: 'null',
      path: 'http://localhost:5000/',
    };
  },
  methods: {},
  components: { TheHeader, BlogListItem, TheFooter, ModifiedNav },
};
</script>

<style scoped>
.content-holder {
  display: flex;
}
.section-2 {
  margin: 30px 30px;
}
.author-section {
  border: 1px groove;
  width: 20%;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.author-section--img {
  width: 60px;
  height: 60px;
  border-radius: 43px;
  background-color: #5c5249;
  /* text-align: center; */
  /* font-size: 22px; */
  /* padding: 4px; */
  color: #eeeeee;
  /* justify-content: center; */
  margin-top: 150px;
}
.extra-img {
  background-size: cover;
  background-repeat: no-repeat;
}
.author-section--info {
  font-weight: 600;
  margin-top: 20px;
}
</style>
