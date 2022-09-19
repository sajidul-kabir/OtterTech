<template>
  <li class="section-2-post">
    <div class="section-2-post-container">
      <img
        v-if="coverPhoto === null"
        src="../../../server/img/blogDefault.webp"
        alt="cover-image"
      />
      <router-link :to="'/blogs/' + id">
        <div
          class="latest"
          :style="{ backgroundImage: `url('${path}${coverPhoto}')` }"
        ></div>
      </router-link>

      <div class="section-2-post-container-text">
        <router-link :to="'/blogs/' + id">
          <h2>
            {{ title }}
          </h2>
        </router-link>

        <p>{{ sanitizedBlog }}</p>
        <p>By {{ user }}, 2 hours ago</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'title', 'blog', 'user', 'coverPhoto'],
  mounted() {
    this.sanitizedBlog = this.stripHtml(this.blog);
  },
  data() {
    return {
      path: 'http://localhost:5000/',
      sanitizedBlog: '',
    };
  },
  methods: {
    stripHtml(html) {
      let tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
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
.latest {
  height: 190px;
  width: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  align-self: baseline;
}
.latest:hover {
  cursor: pointer;
  opacity: 0.7;
  transition: 0.5s ease;
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
