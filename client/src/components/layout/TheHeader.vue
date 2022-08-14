<template>
  <header class="main-header">
    <div>
      <img src="/assets/cover(1).png" alt="logo" />
    </div>

    <p>{{ initial }}</p>
  </header>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      initial: this.user[0],
    };
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

header p {
  width: 40px;
  height: 40px;
  border-radius: 43px;
  background-color: #5c5249;
  text-align: center;
  font-size: 22px;
  padding: 4px;
  color: #eeeeee;
}
</style>
