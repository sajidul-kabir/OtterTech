<template>
  <div>
    <the-header></the-header>
    <div class="profile">
      <div class="settings">
        <h2>Settings</h2>
      </div>
      <div class="public-profile">
        <h2>Public Profile</h2>
        <v-avatar color="grey lighten-1" size="128">
          <v-icon color="black" size="80"> mdi-account </v-icon>
        </v-avatar>
        <div class="my-2">
          <v-btn color="#2b282c" large class="profile-change-picture pt-4 pb-7"
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
  </div>
</template>

<script>
import TheHeader from '../../components/layout/TheHeader.vue';

export default {
  components: { TheHeader },
};
</script>

<style scoped>
.profile {
  background-color: #eeeeee;
  display: flex;
}
.settings {
  width: 35%;
}
.public-profile {
}
.profile-change-picture {
  color: white;
  font-size: 12px;
}
.profile-delete-picture {
  color: red;
  font-size: 12px;
  border: 1px solid red;
}
</style>
