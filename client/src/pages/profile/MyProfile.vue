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
</style>
