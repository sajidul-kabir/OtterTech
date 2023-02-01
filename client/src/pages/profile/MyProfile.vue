<template>
  <div>
    <the-header :user="username" :photo="user_photo"></the-header>
    <div class="profile">
      <div class="settings">
        <div class="settings-holder">
          <h2>Settings</h2>
          <p>FAQ</p>
          <p>Help</p>
          <p>About</p>
          <button class="log-out" @click="logout">Log out</button>
        </div>
      </div>
      <div class="divider-section"></div>
      <div class="public-profile">
        <h2 class="profile-h2">Public Profile</h2>
        <div class="public-profile-photo">
          <div class="public-profile-photo-pic">
            <v-avatar color="grey lighten-1" size="150">
              <div
                class="profile-img"
                :style="{ backgroundImage: `url('${getProfilePhoto()}')` }"
              ></div>
              <!-- <img
                class="img-circle"
                :src="getProfilePhoto()"
                alt="User Avatar"
              /> -->
            </v-avatar>
          </div>

          <div>
            <div class="form-buttons">
              <!-- <v-btn
                color="#2b282c"
                large
                class="profile-change-picture pt-4 pb-7"
                >Change Picture
                <input type="file" @change="onFileSelected" />
              </v-btn> -->
              <div class="form-buttons">
                <label class="file">
                  <input
                    type="file"
                    id="file"
                    aria-label="File browser example"
                    @change="onFileSelected"
                  />
                  <span class="file-custom">Change Picture</span>
                </label>
              </div>
            </div>
            <div class="my-2">
              <v-btn
                class="profile-delete-picture pt-3 pb-7"
                @click="removePhoto"
              >
                Delete Picture
              </v-btn>
            </div>
          </div>
        </div>
        <form class="body-container-form__form" @submit.prevent="profileUpdate">
          <div class="user-box">
            <input
              :style="[
                { borderBottom: wrongUser ? '1px solid red' : '' },
                { color: wrongUser ? 'red' : '' },
              ]"
              type="text"
              name=""
              required=""
              v-model="username"
              @blur="validateUser"
            />
            <label :style="{ color: wrongUser ? 'red' : '' }"
              >Change Username</label
            >
            <div v-if="wrongUser">
              <img class="invalidImg" src="/assets/invalid.png" alt="" />
              <p class="invalid">Invalid Username</p>
            </div>
          </div>
          <div class="user-box">
            <input type="text" name="" required="" v-model="fullname" />
            <label>Change Fullname</label>
          </div>
          <div class="user-box">
            <input type="text" name="" required="" v-model="email" />
            <label>Change Email-Address</label>
          </div>
          <div class="user-box">
            <input type="password" name="" v-model="password" />
            <label>Change Password</label>
          </div>

          <button>Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '../../components/layout/TheHeader.vue';
import axios from 'axios';
export default {
  created() {
    axios
      .get('http://localhost:5000/api/users/me')
      .then((res) => {
        console.log(res);
        this.username = res.data.data[0].username;
        this.fullname = res.data.data[0].fullname;
        this.email = res.data.data[0].email;

        if (res.data.data[0].user_photo != null)
          this.user_photo = res.data.data[0].user_photo;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      wrongUser: false,
      user_photo: 'user.png',
      username: '',
      fullname: '',
      email: '',
      password: '',
      backup: '',
      photo: null,
    };
  },
  methods: {
    logout() {
      axios
        .get(`http://localhost:5000/api/users/logout`)
        .then((res) => {
          console.log(res);
          //this.$store.commit('change', '');
          sessionStorage.clear();
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validateUser() {
      this.wrongUser = false;
    },
    onFileSelected(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      let limit = 1024 * 1024 * 2;
      if (file['size'] > limit) {
        console.log('largeeeeeeeee');
      }
      reader.onloadend = () => {
        this.user_photo = reader.result;
      };
      reader.readAsDataURL(file);
      this.backup = file;
    },
    getProfilePhoto() {
      let photo =
        this.user_photo.length > 200
          ? this.user_photo
          : 'http://localhost:5000/' + this.user_photo;
      return photo;
    },
    removePhoto() {},
    profileUpdate() {
      const fd = new FormData();

      if (this.backup != '') {
        this.user_photo = this.backup;
      }

      fd.append('user_photo', this.user_photo);
      fd.append('username', this.username);
      fd.append('email', this.email);
      fd.append('fullname', this.fullname);

      if (this.password != '') {
        fd.append('password', this.password);
      }

      axios
        .patch('http://localhost:5000/api/users/me', fd, {
          headers: {
            'Content-Type': `multipart/form-data;`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.message === 'Invalid username') {
            this.wrongUser = true;
          }
        });
    },
  },
  components: { TheHeader },
};
</script>

<style scoped>
.profile {
  background-color: #eeeeee;
  display: flex;
}
.profile-h2 {
  margin-top: 70px;
  margin-bottom: 25px;
  font-weight: 100;
}
.settings {
  width: 35%;
}

.settings-holder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}
.settings-holder p {
  margin: 10px 0px;
  border: 1px solid #2b282c54;
  padding: 10px 35px;
  border-radius: 6px;
}
.settings-holder p:hover {
  cursor: pointer;
  background-color: rgb(220, 216, 216);
}
.settings-holder h2 {
  margin-bottom: 30px;
  font-size: 32px;
}
.log-out {
  margin-top: 50px;
  /* border-style: solid; */
  padding: 12px 35px;
  border-radius: 7px;
  background-color: #ff0000ba;
  color: white;
  border: 1px groove;
  font-weight: 600;
  box-shadow: 1px 2px 6px red;
}
.divider-section {
  position: relative;
  border-right: 1px groove;
  height: 406px;
  top: 190px;
  margin-right: 150px;
}
.invalid {
  margin: 0;
  color: red;
  position: relative;
  top: -42px;
  font-size: 12px;
  left: 20px;
}
.invalidImg {
  width: 13px;
  position: relative;
  bottom: 24px;
}
.form-buttons {
  margin-top: 28px !important;
  margin-bottom: 25px !important;
}
.profile-delete-picture {
  color: red;
  font-size: 12px;
  border: 1px solid #ff000070;
}
.public-profile-photo {
  display: flex;
}
.public-profile-photo-pic {
  margin-right: 55px;
}
.profile-img {
  width: 150px;
  background-position: inherit;
  height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
}
.body-container-form__form {
  margin-top: 55px;
  position: relative;
  left: 20px;
}
.user-box {
  position: relative;
}

.user-box input {
  width: 100%;
  padding: 7px 0;
  font-size: 22px;
  color: #2b282c;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.45);
  outline: none;
  background: transparent;
}

.user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 14px;
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
  top: -20px;
  left: 0;
  color: #2b282c;
  font-size: 12px;
  font-weight: bold;
}

.body-container-form__form button {
  width: 40%;
  height: 35px;
  background-color: #2b282c;
  color: white;
  font-size: 16px;
  margin-top: 30px;
  border-radius: 6px;
  margin-bottom: 90px;
}
.body-container-form__form button:hover {
  cursor: pointer;
  opacity: 0.9;
}
.file-custom {
  border: 1px solid;
  font-size: 12p;
  background: #2b282c;
  color: white;
  padding: 10px 17px;
  padding-bottom: 13px;

  border-radius: 6px;
}
.file-custom:hover {
  cursor: pointer;
  box-shadow: 1px 1px 3px black;
}
input[type='file'] {
  display: none;
}
</style>
