<template>
  <section>
    <nav-bar></nav-bar>
    <div class="first-section-gray">
      <div class="first-section-gray-cards">
        <div>
          <popular-blog-item
            :title="second.title"
            :key="second.id"
            :photo="second.photo"
            :author="second.user_username"
            :time="second.created_at"
            :id="second.id"
          ></popular-blog-item>

          <popular-blog-item
            :title="third.title"
            :key="third.id"
            :photo="third.photo"
            :author="third.user_username"
            :time="third.created_at"
            :id="third.id"
            bottom="yes"
          ></popular-blog-item>
        </div>

        <div class="first-section-gray-card special-card">
          <router-link :to="'/blogs/' + first.id">
            <div
              class="special-card-image"
              :style="{ backgroundImage: `url('${first.photo}')` }"
            ></div>
          </router-link>

          <div class="card-text-holder">
            <router-link :to="'/blogs/' + first.id"
              ><h2>{{ first.title }}</h2></router-link
            >

            <p>by {{ first.user_username }}, {{ first.created_at }} in News</p>
          </div>
        </div>

        <div>
          <popular-blog-item
            :title="fourth.title"
            :key="fourth.id"
            :photo="fourth.photo"
            :author="fourth.user_username"
            :time="fourth.created_at"
            :id="fourth.id"
          ></popular-blog-item>
          <popular-blog-item
            :title="fifth.title"
            :key="fifth.id"
            :photo="fifth.photo"
            :author="fifth.user_username"
            :time="fifth.created_at"
            :id="fifth.id"
            bottom="yes"
          ></popular-blog-item>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavBar from './layout/NavBar.vue';
import PopularBlogItem from './PopularBlogItem.vue';

export default {
  components: { NavBar, PopularBlogItem },
  props: ['popular'],
  beforeUpdate() {
    this.popularBlogs = this.popular;

    this.first = this.popularBlogs[0];
    this.first.created_at = this.getDate(this.first.created_at);
    this.first.photo = this.path + this.first.cover_photo;

    this.second = this.popularBlogs[1];
    this.second.created_at = this.getDate(this.second.created_at);
    this.second.photo = this.path + this.second.cover_photo;

    this.third = this.popularBlogs[2];
    this.third.created_at = this.getDate(this.third.created_at);
    this.third.photo = this.path + this.third.cover_photo;

    this.fourth = this.popularBlogs[3];
    this.fourth.created_at = this.getDate(this.fourth.created_at);
    this.fourth.photo = this.path + this.fourth.cover_photo;

    this.fifth = this.popularBlogs[4];
    this.fifth.created_at = this.getDate(this.fifth.created_at);
    this.fifth.photo = this.path + this.fifth.cover_photo;
  },
  data() {
    return {
      popularBlogs: [],
      first: {},
      second: {},
      third: {},
      fourth: {},
      fifth: {},
      path: 'http://localhost:5000/',
    };
  },
  methods: {
    getDate(date) {
      const d = new Date(date).toLocaleString();
      return d;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.first-section-gray {
  background-color: #eeeeee;
}
.first-section-gray-cards {
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 77px;
}
.first-section-gray-card {
  width: 210px;
  background: #ffffff70;
  margin: 13px;
  display: flex;
  flex-direction: column;
  border: 1px groove;
  transition: 0.5s ease;
}
.first-section-gray-card:hover {
  cursor: pointer;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.first-section-gray-card p {
  margin: 16px 10px;
}

.special-card {
  position: relative;
  bottom: 68px;
  width: 430px;
  min-width: 365px;
  margin: 13px 25px;
}
.special-card-image {
  height: 300px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.special-card h2 {
  font-size: 28px;
  margin: 23px 30px;
  color: #2b282c;
}
.special-card h2:hover {
  text-decoration: underline solid rgba(0, 0, 0, 0.699) 1px;
  text-underline-position: under;
}
.special-card p {
  margin: 23px 30px;
  margin-top: 0;
}
.bottom-card {
  margin-top: 25px;
}
</style>
