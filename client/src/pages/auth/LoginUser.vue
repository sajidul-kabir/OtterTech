<template>
  <div>
    <div class="loading" style="background-color: black" v-if="loading">
      <v-progress-linear
        style="height: 1px"
        indeterminate
        color="#eeeeee"
      ></v-progress-linear>
    </div>
    <form-ui>
      <template v-slot:header>
        <h2>Sign in & Join the Community</h2>
      </template>
      <form class="body-container-form__form" @submit.prevent="loginUser">
        <div class="user-box">
          <input
            :style="[
              { borderBottom: wrongUser ? '1px solid red' : '' },
              { color: wrongUser ? 'red' : '' },
            ]"
            type="text"
            name=""
            required=""
            v-model="user.username"
            @blur="validateUser"
          />
          <label :style="{ color: wrongUser ? 'red' : '' }">Username</label>
          <div v-if="wrongUser">
            <img class="invalidImg" src="/assets/invalid.png" alt="" />
            <p class="invalid">Invalid Username</p>
          </div>
        </div>
        <div class="user-box">
          <input
            :style="[
              { borderBottom: wrongPass ? '1px solid red' : '' },
              { color: wrongPass ? 'red' : '' },
            ]"
            type="password"
            name=""
            required=""
            v-model="user.password"
            @blur="validatePass"
          />
          <label :style="{ color: wrongPass ? 'red' : '' }">Password</label>
          <div v-if="wrongPass">
            <img class="invalidImg" src="/assets/invalid.png" alt="" />
            <p class="invalid">Wrong Password</p>
          </div>
        </div>

        <button>Sign in</button>
        <div class="body-container-form__form--text">
          <p>Don't have an Account ?</p>
          <router-link to="/register">Register</router-link>
        </div>
      </form>
    </form-ui>
  </div>
</template>

<script>
import axios from 'axios';
import FormUi from '../../components/layout/FormUi.vue';
//import { mapActions } from 'vuex';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      loading: false,
      wrongPass: false,
      wrongUser: false,
    };
  },
  methods: {
    // ...mapActions({
    //   signIn: 'auth/signIn',
    // }),
    loginUser() {
      this.loading = true;
      // this.signIn(this.user)
      //   .then(() => {
      //     this.$router.push('/');
      //   })
      //   .catch((err) => {
      //     console.log(err.response.data.message);
      //     if (err.response.data.message === 'Invalid username') {
      //       this.wrongUser = true;
      //     }
      //     if (err.response.data.message === 'Wrong Password') {
      //       this.wrongPass = true;
      //     }
      //   });

      axios
        .post('http://localhost:5000/api/users/login', this.user)
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.$store.commit('change', this.user.username);
          //this.$store.commit('changePhoto', this.user.username);
          this.$router.push('/');
        })
        .catch((err) => {
          this.loading = false;
          console.log(err.response.data.message);
          if (err.response.data.message === 'Invalid username') {
            this.wrongUser = true;
          }
          if (err.response.data.message === 'Wrong Password') {
            this.wrongPass = true;
          }
        });
    },
    validatePass() {
      this.wrongPass = false;
    },
    validateUser() {
      this.wrongUser = false;
    },
  },
  components: { FormUi },
};
</script>

<style scoped>
.body-container-form__form {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 100%;
  height: 35px;
  background-color: #2b282c;
  color: white;
  font-size: 16px;
  margin-top: 30px;
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
.body-container-form__form--text p {
  margin-right: 5px;
}
.body-container-form__form--text a {
  text-decoration: none;
  color: #7b6042;
  font-weight: bold;
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
</style>
