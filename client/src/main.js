import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
//import { createStore } from 'vuex';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

const app = createApp(App);
app.use(vuetify);
app.use(store);
app.use(router);

app.mount('#app');
