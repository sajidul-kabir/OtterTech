<template>
  <div class="first-section-gray-card" :class="extraCard">
    <router-link :to="'/blogs/' + id">
      <div
        class="card-image"
        :style="{ backgroundImage: `url('${photo}')` }"
      ></div>
    </router-link>

    <div class="card-text-holder">
      <router-link :to="'/blogs/' + id"
        ><p class="card-text">{{ title }}</p></router-link
      >
      <p class="card-author">By {{ author }}, {{ time }} in News</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'title', 'photo', 'author', 'time', 'bottom'],
  data() {
    return {};
  },
  computed: {
    extraCard() {
      if (this.bottom === 'yes') return 'bottom-card';
      else return 'top-card';
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
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
.card-text-holder {
  background-color: #ffffff70;
  flex: auto;
}
.bottom-card {
  margin-top: 25px;
}
.top-card {
}
</style>
