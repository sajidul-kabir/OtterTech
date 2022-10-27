<template>
  <header class="main-header">
    <div>
      <router-link to="/"
        ><img src="/assets/cover(1).png" alt="logo"
      /></router-link>
    </div>
    <div class="header-icons">
      <div
        v-if="photo"
        class="header-icons--img"
        :style="{ backgroundImage: `url('${path}${photo}')` }"
      ></div>
      <div v-else class="header-icons--profile">A</div>
      <img
        class="header-dd"
        src="/assets/615-6156460_grey-triangle-no-background-png-download-arrow-transparent-removebg-preview.png"
        alt="default.png"
        @click="dropDown"
      />
      <div class="dropdown" :style="{ display: dd ? 'table' : 'none' }">
        <div class="dropdown-content">
          <p>Signed in as {{ user }}</p>
          <router-link to="/profile">Profile</router-link>
          <a href="#">My-Blogs</a>
          <a href="#">Favourites</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ['user', 'photo'],
  data() {
    return {
      initial: this.user,
      dd: false,
      path: 'http://localhost:5000/',
      final: this.path + this.photo,
    };
  },
  methods: {
    dropDown() {
      this.dd = !this.dd;
    },
  },
};
</script>

<style scoped>
.main-header {
  background-color: #2b282c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 80px;
  padding-right: 140px;
  border-bottom: 1px solid #74665747;
}

header img {
  width: 250px;
  height: 100px;
}
header img:hover {
  cursor: pointer;
}
.header-icons--img {
  width: 40px;
  height: 40px;
  border-radius: 43px;
  background-color: #5c5249;
  text-align: center;
  font-size: 22px;
  padding: 4px;
  color: #eeeeee;
  background-size: cover;
  background-repeat: no-repeat;
}
.header-icons--profile {
  width: 40px;
  height: 40px;
  border-radius: 43px;
  background-color: #5c5249;
  text-align: center;
  font-size: 22px;
  padding: 4px;
  color: #eeeeee;
}
.header-icons--profile:hover {
  cursor: pointer;
}
.header-icons {
  display: flex;
  align-items: center;
}
.header-dd {
  width: 18px;
  height: 14px;
  margin-left: 5px;
  margin-top: 6px;
}
.header-dd:hover {
  cursor: pointer;
}
.dropdown {
  display: none;
  height: 180px;
  background-color: #eeeeee;
  position: absolute;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
  z-index: 1;
  top: 88px;
}
.dropdown-content p {
  margin: 0;
  border-bottom: 1px groove;
  padding: 12px 16px;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover {
  background-color: #bebebe;
}
</style>
