<template>
  <div>
    <form
      method="post"
      enctype="multipart/form-data"
      @submit.prevent="submitBlog"
    >
      <div>
        <input
          type="text"
          placeholder="Tite"
          name="title"
          v-model="newBlog.title"
        />
      </div>
      <div>
        <textarea
          name="blog"
          id="blog"
          cols="100"
          rows="20"
          v-model="newBlog.blog"
        ></textarea>
      </div>

      <input type="file" @change="onFileSelected" />
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  //   mounted() {
  //     const x = document.cookie.split(' ');
  //     console.log(x);
  //   },
  data() {
    return {
      newBlog: {
        title: '',
        blog: '',
        user_username: window.localStorage.getItem('username'),
      },
      cover_photo: null,
    };
  },
  methods: {
    onFileSelected(e) {
      this.cover_photo = e.target.files[0];
    },
    submitBlog() {
      console.log(this.newBlog);
      const fd = new FormData();
      fd.append('cover-photo', this.cover_photo);
      fd.append('user_username', this.newBlog.user_username);
      fd.append('title', this.newBlog.title);
      fd.append('blog', this.newBlog.blog);

      axios
        .post('http://localhost:5000/api/blogs', fd, {
          headers: {
            'Content-Type': `multipart/form-data;`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
div {
  align-content: center;
  margin: auto;
}
</style>
