<template>
  <div>
    <the-header></the-header>

    <form
      class="body-container-form__form"
      method="post"
      enctype="multipart/form-data"
      @submit.prevent="submitBlog"
    >
      <div class="user-box">
        <input type="text" name="title" required="" v-model="newBlog.title" />
        <label>Title</label>
      </div>
      <!-- <div class="user-box">
        <textarea
          name="blog"
          class="textarea"
          id="blog"
          cols="90"
          rows="15"
          required=""
          placeholder="Share Your Story..."
          v-model="newBlog.blog"
        >
        
        </textarea>
      </div> -->
      <div v-if="editor">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          bold
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          italic
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          strike
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          code
        </button>
        <button @click="editor.chain().focus().unsetAllMarks().run()">
          clear marks
        </button>
        <button @click="editor.chain().focus().clearNodes().run()">
          clear nodes
        </button>
        <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          paragraph
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          h1
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          h2
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          h3
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
          h4
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
          h5
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        >
          h6
        </button>

        <button @click="editor.chain().focus().undo().run()">undo</button>
        <button @click="editor.chain().focus().redo().run()">redo</button>
      </div>
      <editor-content :editor="editor" />

      <div class="form-buttons">
        <label class="file"
          >{{ label }}
          <input
            type="file"
            id="file"
            aria-label="File browser example"
            @change="onFileSelected"
          />
          <span class="file-custom">Browse</span>
        </label>
        <button>Post</button>
      </div>
    </form>
    <the-footer></the-footer>
  </div>
</template>

<script>
import axios from 'axios';
import TheHeader from '../../components/layout/TheHeader.vue';
import TheFooter from '../../components/layout/TheFooter.vue';

import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

export default {
  components: { TheHeader, TheFooter, EditorContent },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: `
         
        `,
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },

  data() {
    return {
      editor: null,
      newBlog: {
        title: '',
        blog: '',
        user_username: window.localStorage.getItem('username'),
      },
      cover_photo: null,
      label: 'Choose File...',
    };
  },

  methods: {
    onFileSelected(e) {
      this.cover_photo = e.target.files[0];
      this.label = e.target.files[0].name;
    },
    submitBlog() {
      this.newBlog.blog = this.editor.getHTML();
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
/* div {
  align-content: center;
  margin: auto;
} */
.body-container-form__form {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin-left: 120px;
  margin-top: 50px;
  margin-bottom: 40px;
}
.user-box {
  position: relative;
}

.user-box input {
  width: 178%;
  padding: 7px 0;
  font-size: 35px;
  color: #2b282c;
  margin-bottom: 50px;
  border: none;
  border-bottom: 1px groove;
  outline: none;
  background: transparent;
}
.user-box label {
  position: absolute;
  top: 0;
  left: 10px;
  padding: 10px 0;
  font-size: 20px;
  /* color: #fff; */
  pointer-events: none;
  transition: 0.5s;
  color: #000000c4;
}

.user-box input:active,
.user-box input:focus {
  border-bottom: 1px solid #2b282c;
}

.user-box input:focus ~ label,
.user-box input:valid ~ label {
  top: -25px;
  left: 0;
  color: #2b282c;
  font-size: 20px;
  font-weight: bold;
}
.textarea {
  font-size: 20px;
  padding: 15px;
  resize: none;
  border: 1px groove;
  margin-bottom: 35px;
}
.textarea::placeholder {
  font-family: 'Inter', sans-serif;
  font-family: 'Lora', serif;
}
.textarea:focus {
  outline: none !important;
  border-color: #2b282c;
  box-shadow: 0 0 4px #2b282c;
}

.body-container-form__form button {
  width: 125px;
  height: 45px;
  background-color: rgb(43, 40, 44);
  color: white;
  font-size: 16px;
  border-radius: 5px;
}
.body-container-form__form button:hover {
  cursor: pointer;
  opacity: 0.9;
}
.body-container-form__form--text {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 40px;
}
.form-buttons {
  align-items: baseline;
  display: flex;
}
.input-file {
  flex: none;
}
.file {
  display: flex;
  height: 45px;
  font-size: 18px;
  border: 1px solid #00000042;
  border-radius: 6px;
  align-items: center;
  padding-left: 15px;
  margin-right: 40px;
}
.file:hover {
  cursor: pointer;
}
.file-custom {
  background-color: #5a5a5a26;
  padding: 11px;
  margin-left: 15px;
}
input[type='file'] {
  display: none;
}
</style>
<style lang="scss" scoped>
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
  button {
    border-style: none;
    margin: 0px 10px;
    border: 1px groove;
    padding: 0px 10px;
    border-radius: 5px;
    background: #2b282c14;
  }
  p {
    border: 1px solid red;
  }
}
</style>
