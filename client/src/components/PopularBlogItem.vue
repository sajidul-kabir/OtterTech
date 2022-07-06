<template>
  <div class="first-section-gray-card">
    <div class="card-image"></div>
    <div class="card-text-holder">
      <p class="card-text">ss</p>
      <p class="card-author">a in News</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'photo'],
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
.top-card {
}
</style>
