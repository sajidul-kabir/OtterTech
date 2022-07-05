import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/home/HomePage.vue';
import LoginUser from './pages/auth/LoginUser.vue';
import RegisterUser from './pages/auth/RegisterUser.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginUser },
    { path: '/register', component: RegisterUser },
  ],
});

export default router;
