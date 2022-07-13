import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/home/HomePage.vue';
import LoginUser from './pages/auth/LoginUser.vue';
import RegisterUser from './pages/auth/RegisterUser.vue';
import WriteBlog from './pages/blog/WriteBlog.vue';
import FormUi from './components/FormUi.vue';
import BlogView from './pages/blog/BlogView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginUser },
    { path: '/register', component: RegisterUser },
    { path: '/write-blog', component: WriteBlog },
    { path: '/form', component: FormUi },
    { path: '/blogs/:blogId', component: BlogView, props: true },
  ],
  linkActiveClass: 'active', // active class for non-exact links.
  linkExactActiveClass: 'active', // active class for *exact* links.
});

export default router;
