<template>
  <div class="section-2-wrapper">
    <div class="section-2-purple"></div>
    <h1 class="section-2-header">The Latest</h1>
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
        ></blog-list-item>
      </ul>
    </div>
  </div>
</template>

<script>
import BlogListItem from './BlogListItem.vue';
export default {
  props: ['blogs'],
  components: { BlogListItem },
};
</script>

<style scoped>
.section-2-wrapper {
  margin: 30px 90px;
  margin-left: 150px;
}
.section-2-purple {
  width: 38px;
  height: 3px;
  background: #db70ff;
  border-radius: 20px;
}
.section-2-header {
  font-size: 36px;
  margin-top: 15px;
  margin-bottom: 25px;
}
.section-2-posts {
}
</style>
