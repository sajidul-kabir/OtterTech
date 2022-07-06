<template>
  <section>
    <nav-bar></nav-bar>
    <div class="first-section-gray">
      <div class="first-section-gray-cards">
        <div>
          <div class="first-section-gray-card">
            <div class="card-image card-image-1"></div>
            <div class="card-text-holder">
              <p class="card-text">
                {{ second.title }}
              </p>
              <p class="card-author">
                by {{ second.user_username }} {{ second.created_at }} in News
              </p>
            </div>
          </div>
          <div class="first-section-gray-card bottom-card">
            <div class="card-image card-image-2"></div>
            <div class="card-text-holder">
              <p class="card-text">
                {{ third.title }}
              </p>
              <p class="card-author">
                by {{ third.user_username }} {{ third.created_at }}
              </p>
            </div>
          </div>
        </div>

        <div class="first-section-gray-card special-card">
          <div class="special-card-image"></div>
          <div class="card-text-holder">
            <h2>{{ first.title }}</h2>
            <p>by {{ first.user_username }}, {{ first.created_at }} in News</p>
          </div>
        </div>

        <div>
          <div class="first-section-gray-card">
            <div class="card-image card-image-3"></div>
            <div class="card-text-holder">
              <p class="card-text">
                {{ fourth.title }}
              </p>
              <p class="card-author">
                by {{ fourth.user_username }} {{ fourth.created_at }}
              </p>
            </div>
          </div>
          <div class="first-section-gray-card bottom-card">
            <div class="card-image card-image-4"></div>
            <div class="card-text-holder">
              <p class="card-text">
                {{ fifth.title }}
              </p>
              <p class="card-author">
                by {{ fifth.user_username }} {{ fifth.created_at }} in News
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NavBar from './layout/NavBar.vue';
export default {
  components: { NavBar },
  props: ['popular'],
  updated() {
    this.popularBlogs = this.popular;

    this.first = this.popularBlogs[0];
    this.first.created_at = this.getDate(this.first.created_at);

    this.second = this.popularBlogs[1];
    this.second.created_at = this.getDate(this.second.created_at);

    this.third = this.popularBlogs[2];
    this.third.created_at = this.getDate(this.third.created_at);

    this.fourth = this.popularBlogs[3];
    this.fourth.created_at = this.getDate(this.fourth.created_at);

    this.fifth = this.popularBlogs[4];
    this.fifth.created_at = this.getDate(this.fifth.created_at);
  },
  data() {
    return {
      popularBlogs: [],
      first: {},
      second: {},
      third: {},
      fourth: {},
      fifth: {},
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
}

.card-image-2 {
  background-image: url('/assets/download\ \(1\).jfif');
}
.card-image-3 {
  background-image: url('/assets/0x0.jpg');
}
.card-image-4 {
  background-image: url('/assets/gsmarena_000.jpg');
} */
.card-text-holder {
  background-color: #ffffff70;
  flex: auto;
}
.special-card {
  position: relative;
  bottom: 68px;
  height: 527px;
  width: 430px;
  min-width: 365px;
  background: transparent;
  margin: 13px 25px;
}
.special-card-image {
  height: 300px;
  width: 100%;
  /* background-image: url(./assets/download.jfif); */
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
