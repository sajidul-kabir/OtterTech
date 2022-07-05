<template>
  <li class="section-2-post">
    <div class="section-2-post-container">
      <img
        v-if="coverPhoto === null"
        src="../../../server/img/blogDefault.webp"
        alt="cover-image"
      />
      <img
        v-else
        :src="require(`../../../server/img/blogs/${coverPhoto}`)"
        alt="cover-image"
      />
      <div class="section-2-post-container-text">
        <h2>
          {{ title }}
        </h2>
        <p>{{ blog }}</p>
        <p>By {{ user }}, 2 hours ago</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  //   mounted() {
  //     if (this.coverPhoto != null) {
  //       let string = '../../../server/img/blogs/' + this.coverPhoto;
  //       console.log(string);
  //     }
  //   },
  props: ['id', 'title', 'blog', 'user', 'coverPhoto'],
  //   data() {
  //     return {
  //       path: '../../../server/img/blogs/' + this.coverPhoto,
  //     };
  //   },
};
</script>

<style scoped>
.section-2-post {
  list-style: none;
  padding: 40px 0px;
  border-bottom: 1px solid #dedede;
  padding-bottom: 50px;
}
.section-2-post-container {
  display: flex;
  align-items: center;
}
.section-2-post-container img {
  opacity: 1;
  max-width: 300px;
  height: auto;
  transition: 0.5s ease;
}
.section-2-post-container img:hover {
  opacity: 0.7;
  cursor: pointer;
}
.section-2-post-container h2,
p {
  margin: 0;
}
.section-2-post-container-text {
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  margin-bottom: 50px;
}
.section-2-post-container-text h2 {
  font-size: 26px;
  max-width: 450px;
  color: #2b282c;
}
.section-2-post-container-text h2:hover {
  cursor: pointer;
  text-decoration: underline 1px solid rgba(0, 0, 0, 0.603);
  text-underline-position: under;
}
.section-2-post-container-text p {
  margin-top: 10px;
  max-width: 450px;
  color: #000000d1;
  width: 100ch;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
