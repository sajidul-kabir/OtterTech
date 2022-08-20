<template>
  <div class="body-container">
    <div class="body-container-branding">
      <img
        src="/assets/cover(1).png"
        alt=""
        class="body-container-branding__img"
      />
      <h2>~ A News Portal for Tech Enthussiasts ~</h2>
    </div>
    <div class="body-container-form">
      <!-- <h2>Sign in & Join the Community</h2> -->
      <slot name="header"></slot>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({}),
};
</script>
<style scoped>
.body-container {
  display: flex;
  min-height: 713px;
}
.body-container-branding {
  background-color: #2b282c;
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.body-container-branding__img {
  width: 350px;
}
.body-container-branding h2 {
  color: #ffffffc2;
  font-weight: 100;
  /* max-width: 210px; */
  margin: 0;
  margin-bottom: 70px;
  margin-top: 30px;
  word-spacing: 3px;
  line-height: 1.3;
}
.body-container-form {
  background-color: #eeeeee;
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
