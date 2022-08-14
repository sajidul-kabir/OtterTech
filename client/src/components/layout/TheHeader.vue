<template>
  <header class="main-header">
    <div>
      <img src="/assets/cover(1).png" alt="logo" />
    </div>
    <div class="header-icons">
      <p>{{ initial }}</p>
      <img
        class="header-dd"
        src="/assets/615-6156460_grey-triangle-no-background-png-download-arrow-transparent-removebg-preview.png"
        alt=""
      />
    </div>
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
header p:hover {
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
</style>
