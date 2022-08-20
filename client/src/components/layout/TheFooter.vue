<template>
  <v-footer dark padless class="footer-holder">
    <v-card flat tile class="indigo lighten-1 white--text text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        <v-container class="grey lighten-5">
          <v-row no-gutters class="footer-holder--row">
            <v-col cols="12" sm="4" class="footer-holder--cols">
              <v-card class="pa-2" flat>
                <h2 class="footer-section">About</h2>
                <p>OtterTech Team</p>
                <p>Motivation</p>
                <p>Advertise</p>
                <p>FAQ</p>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4" class="footer-holder--cols">
              <v-card class="pa-2" flat>
                <h2 class="footer-section">Sections</h2>
                <p>News</p>
                <p>Jobs</p>
                <p>Reviews</p>
                <p>Entertainment</p>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4" class="footer-holder--cols">
              <v-card class="pa-2" flat>
                <h2 class="footer-contact">Contact Us</h2>
                <p class="footer-address">
                  Address : 98 Post St, San Francisco, CA 94104. 575 Market St,
                  Ste 150, San Francisco, CA 94105.
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>OtterTech</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
  }),
};
</script>
<style scoped>
.footer-holder {
  justify-content: center;
}
.footer-holder--row {
  flex-wrap: nowrap;
}
.footer-holder--cols {
  min-width: 373px;
}
.footer-section {
  margin-bottom: 15px;
}
.footer-address {
  padding: 26px;
}
.footer-contact {
  margin-bottom: 3px;
}
</style>
