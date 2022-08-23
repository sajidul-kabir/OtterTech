<template>
  <div>
    <the-header></the-header>
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
            <v-avatar color="grey lighten-1" size="128">
              <v-icon color="black" size="80"> mdi-account </v-icon>
            </v-avatar>
          </div>

          <div>
            <div class="my-2">
              <v-btn
                color="#2b282c"
                large
                class="profile-change-picture pt-4 pb-7"
                >Change Picture
              </v-btn>
            </div>
            <div class="my-2">
              <v-btn class="profile-delete-picture pt-3 pb-7">
                Delete Picture
              </v-btn>
            </div>
          </div>
        </div>
        <form class="body-container-form__form">
          <div class="user-box">
            <input type="text" name="" required="" />
            <label>Change Username</label>
          </div>
          <div class="user-box">
            <input type="text" name="" required="" />
            <label>Change Fullname</label>
          </div>
          <div class="user-box">
            <input type="text" name="" required="" />
            <label>Change Email-Address</label>
          </div>
          <div class="user-box">
            <input type="password" name="" required="" />
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
  methods: {
    logout() {
      axios
        .get(`http://localhost:5000/api/users/logout`)
        .then((res) => {
          console.log(res);
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
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
.public-profile {
}
.profile-change-picture {
  color: white;
  font-size: 12px;
  margin: 5px 0px;
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
</style>
