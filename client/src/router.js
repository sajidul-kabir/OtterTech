import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/home/HomePage.vue';
import LoginUser from './pages/auth/LoginUser.vue';
import RegisterUser from './pages/auth/RegisterUser.vue';
import WriteBlog from './pages/blog/WriteBlog.vue';
import FormUi from './components/layout/FormUi.vue';
import BlogView from './pages/blog/BlogView.vue';
import MyProfile from './pages/profile/MyProfile.vue';
import TiptapTest from './components/TiptapTest.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginUser },
    { path: '/register', component: RegisterUser },
    { path: '/write-blog', component: WriteBlog },
    { path: '/form', component: FormUi },
    { path: '/blogs/:blogId', component: BlogView, props: true },
    { path: '/profile', component: MyProfile, props: true },
    { path: '/tiptap', component: TiptapTest, props: true },
  ],
  linkActiveClass: 'active', // active class for non-exact links.
  linkExactActiveClass: 'active', // active class for *exact* links.
});

export default router;
