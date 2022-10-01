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

      <div v-if="editor">
        <div class="icon-holder">
          <template v-for="(item, index) in items">
            <div
              class="divider"
              v-if="item.type === 'divider'"
              :key="`divider${index}`"
            ></div>
            <menu-item v-else :key="index" v-bind="item" />
          </template>
        </div>
      </div>
      <editor-content :editor="editor" @keypress="editorCheck" />

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
        <button class="submitBtn">Post</button>
      </div>
    </form>
    <the-footer></the-footer>
  </div>
</template>

<script>
import axios from 'axios';
import TheHeader from '../../components/layout/TheHeader.vue';
import TheFooter from '../../components/layout/TheFooter.vue';

//Tiptap imports
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';
import MenuItem from '../../components/MenuItem.vue';
import Highlight from '@tiptap/extension-highlight';

export default {
  components: { TheHeader, TheFooter, EditorContent, MenuItem },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, Highlight],
      content: `My Blog !!! `,
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },

  data() {
    return {
      editor: null,
      wooord: '',
      newBlog: {
        title: '',
        blog: '',
        user_username: window.localStorage.getItem('username'),
      },
      cover_photo: null,
      label: 'Choose File...',
      items: [
        {
          icon: 'bold',
          title: 'Bold',
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('bold'),
        },
        {
          icon: 'italic',
          title: 'Italic',
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive('italic'),
        },
        {
          icon: 'strikethrough',
          title: 'Strike',
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive('strike'),
        },
        {
          icon: 'code-view',
          title: 'Code',
          action: () => this.editor.chain().focus().toggleCode().run(),
          isActive: () => this.editor.isActive('code'),
        },
        {
          icon: 'mark-pen-line',
          title: 'Highlight',
          action: () => this.editor.chain().focus().toggleHighlight().run(),
          isActive: () => this.editor.isActive('highlight'),
        },
        {
          type: 'divider',
        },
        {
          icon: 'h-1',
          title: 'Heading 1',
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 1 }),
        },
        {
          icon: 'h-2',
          title: 'Heading 2',
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 2 }),
        },
        {
          icon: 'paragraph',
          title: 'Paragraph',
          action: () => this.editor.chain().focus().setParagraph().run(),
          isActive: () => this.editor.isActive('paragraph'),
        },
        {
          icon: 'list-unordered',
          title: 'Bullet List',
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive('bulletList'),
        },
        {
          icon: 'list-ordered',
          title: 'Ordered List',
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive('orderedList'),
        },
        {
          icon: 'code-box-line',
          title: 'Code Block',
          action: () => this.editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => this.editor.isActive('codeBlock'),
        },
        {
          type: 'divider',
        },
        {
          icon: 'double-quotes-l',
          title: 'Blockquote',
          action: () => this.editor.chain().focus().toggleBlockquote().run(),
          isActive: () => this.editor.isActive('blockquote'),
        },
        {
          icon: 'separator',
          title: 'Horizontal Rule',
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          type: 'divider',
        },
        {
          icon: 'text-wrap',
          title: 'Hard Break',
          action: () => this.editor.chain().focus().setHardBreak().run(),
        },
        {
          icon: 'format-clear',
          title: 'Clear Format',
          action: () =>
            this.editor.chain().focus().clearNodes().unsetAllMarks().run(),
        },
        {
          type: 'divider',
        },
        {
          icon: 'arrow-go-back-line',
          title: 'Undo',
          action: () => this.editor.chain().focus().undo().run(),
        },
        {
          icon: 'arrow-go-forward-line',
          title: 'Redo',
          action: () => this.editor.chain().focus().redo().run(),
        },
      ],
    };
  },

  methods: {
    onFileSelected(e) {
      this.cover_photo = e.target.files[0];
      this.label = e.target.files[0].name;
    },
    parseBlogForTags() {
      let words = this.editor.getText().split(' ');
      let tagWords = [];

      words.forEach((word) => {
        if (word[0] === '#') {
          tagWords.push(word);
        }
      });
      return tagWords;
    },
    assembleTags(tags, blog_id) {
      const tagsObj = {};
      let tagsArr = [];

      tags.forEach((tag) => {
        tagsArr.push({
          blog_id,
          tag_name: tag,
        });
      });
      tagsObj.items = tagsArr;
      return tagsObj;
    },
    editorCheck(v) {
      if (v.key === '#') {
        this.editor.commands.setBold();
        this.wooord = this.wooord + v.key;
      } else if (v.key === ' ') {
        if (this.wooord[0] === '#') {
          this.editor.commands.unsetBold();
        }
        this.wooord = '';
      } else {
        this.wooord = this.wooord + v.key;
      }
    },

    submitBlog() {
      let tags_final;
      this.newBlog.blog = this.editor.getHTML();
      let tagWords = this.parseBlogForTags();

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
          tags_final = this.assembleTags(tagWords, res.data.data.insertId);
          console.log(tags_final);
        })
        .then(() => {
          axios.post('http://localhost:5000/api/blogs/tags', tags_final);
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

.submitBtn {
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
  padding: 9px;
  margin-left: 15px;
}
input[type='file'] {
  display: none;
}
</style>
<style lang="scss">
.ProseMirror {
  min-width: 1200px;
  min-height: 500px;
  border: 1px groove;
  padding: 10px;
  margin: 10px 0px;
  margin-bottom: 35px;
}
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
.icon-holder {
  display: flex;
  margin-top: 35px;
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

mark {
  background-color: #faf594;
}

img {
  max-width: 100%;
  height: auto;
}

hr {
  margin: 1rem 0;
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
</style>
