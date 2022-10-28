<template>
  <TheHeader></TheHeader>
  <ModifiedNav></ModifiedNav>
  <div class="section-2-wrapper mt-12">
    <div class="section-2-purple"></div>
    <h1 class="section-2-header">Latest Products</h1>
    <div style="border-top: 1px solid #dedede"></div>
    <div>
      <ul class="section-2-posts">
        <blog-list-item
          v-for="blog in blogs"
          :key="blog.id"
          :id="blog.id"
          :title="blog.title"
          :blog="blog.blog"
          :user="blog.user_username"
          :coverPhoto="blog.cover_photo"
        ></blog-list-item>
      </ul>
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
  beforeCreate() {
    if (this.$store.state.username === '') {
      this.$router.push('/login');
    }
  },
  created() {
    axios
      .get('http://localhost:5000/api/blogs/tags/products')
      .then((res) => {
        this.blogs = res.data.data;
        console.log(this.blogs);
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
  methods: {},
  components: { TheHeader, BlogListItem, TheFooter, ModifiedNav },
};
</script>
