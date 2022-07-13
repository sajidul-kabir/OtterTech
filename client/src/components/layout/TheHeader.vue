<template>
  <header class="main-header">
    <div>
      <img src="/assets/cover(1).png" alt="logo" />
    </div>

    <p>Hi {{ user }}</p>
  </header>
</template>

<script>
export default {
  props: ['user'],
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
  margin: 0;
  color: #ffffffc7;
}
</style>
