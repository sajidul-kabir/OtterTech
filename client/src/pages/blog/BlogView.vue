<template>
  <div>
    <the-header></the-header>
    <section class="section1">
      <h1>{{ title }}</h1>
      <div class="section1-content">
        <div class="section1-content__author">
          <div class="section1-content__author--profile"></div>
          <p class="author">Author s.k.a</p>
          <div class="section1-content__author--divider"></div>
          <div class="section1-content__author--icon">
            <img src="/assets/like.png" alt="like" />
            <img src="/assets/comment.png" alt="comment" />
            <img src="/assets/facebook.png" alt="facebook" />
          </div>
          <div class="section1-content__author--divider"></div>
          <p class="tags">
            Tags Used in this article: Gaming, Elden Ring, FromSoftware,
            Popular, GameoftheYear
          </p>
        </div>
        <div
          class="section1-content__img"
          :style="{ backgroundImage: `url('${path}${coverPhoto}')` }"
        ></div>
      </div>
      <p>hello</p>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import TheHeader from '../../components/layout/TheHeader.vue';
export default {
  props: ['blogId'],
  created() {
    const id = this.$route.params.blogId;
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => {
        this.title = res.data.data[0].title;
        this.coverPhoto = res.data.data[0].cover_photo;
        console.log(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      title: '',
      coverPhoto: '',
      path: 'http://localhost:5000/',
    };
  },
  components: { TheHeader },
};
</script>

<style scoped>
.section1 {
  background-color: #eeeeee;
  height: 465px;
  width: 100%;
}
.section1 h1 {
  font-size: 35px;
  max-width: 962px;
  margin: 0px auto;
  padding: 35px 0px;
  font-family: none;
  text-align: center;
}
.section1-content {
  display: flex;
}
.section1-content__author {
  width: 25%;
  height: 304px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.section1-content__author--profile {
  width: 30px;
  height: 30px;
  background: gray;
  border-radius: 50%;
}
.author {
  margin-bottom: 25px;
}
.section1-content__author--divider {
  width: 60%;
  border-bottom: 1px solid #00000047;
}
.section1-content__author--icon {
  display: flex;
}
.tags {
  padding-left: 45px;
  margin-top: 25px;
}
.section1-content__author--icon img {
  width: 30px;
  margin: 30px 12px;
}
.section1-content__img {
  width: 40%;
  height: 455px;
  margin-left: 75px;
  background-repeat: no-repeat;
  background-size: auto;
  background-position: center;
  position: relative;
  top: 15px;
}
</style>
