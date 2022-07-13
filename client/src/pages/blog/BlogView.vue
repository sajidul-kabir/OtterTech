<template>
  <h1>{{ title }}</h1>
</template>

<script>
import axios from 'axios';
export default {
  props: ['blogId'],

  created() {
    const id = this.$route.params.blogId;
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => {
        this.title = res.data.data[0].title;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      title: '',
    };
  },
};
</script>
