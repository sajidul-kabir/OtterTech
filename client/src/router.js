import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/home/HomePage.vue';
import LoginUser from './pages/auth/LoginUser.vue';
import RegisterUser from './pages/auth/RegisterUser.vue';
import MyBlogs from './pages/profile/MyBlogs.vue';
import TechPage from './pages/tags/TechPage.vue';
import GamingPage from './pages/tags/GamingPage.vue';
import EntertainmentPage from './pages/tags/EntertainmentPage.vue';
import ProductsPage from './pages/tags/ProductsPage.vue';
import ReviewsPage from './pages/tags/ReviewsPage.vue';
import OthersPage from './pages/tags/OthersPage.vue';
import WriteBlog from './pages/blog/WriteBlog.vue';
import FormUi from './components/layout/FormUi.vue';
import BlogView from './pages/blog/BlogView.vue';
import MyProfile from './pages/profile/MyProfile.vue';
import store from './store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', name: 'login', component: LoginUser },
    { path: '/register', component: RegisterUser },
    {
      path: '/my-blogs',
      component: MyBlogs,
      beforeEnter: (to, from, next) => {
        if (!store.getters.get.username) {
          return next({
            name: 'login',
          });
        }
        next();
      },
    },
    {
      path: '/technology',
      component: TechPage,
      beforeEnter: (to, from, next) => {
        if (!store.getters.get.username) {
          return next({
            name: 'login',
          });
        }
        next();
      },
    },
    {
      path: '/gaming',
      component: GamingPage,
      beforeEnter: (to, from, next) => {
        if (!store.getters.get.username) {
          return next({
            name: 'login',
          });
        }
        next();
      },
    },
    {
      path: '/entertainment',
      component: EntertainmentPage,
      beforeEnter: (to, from, next) => {
        if (!store.getters.get.username) {
          return next({
            name: 'login',
          });
        }
        next();
      },
    },
    {
      path: '/products',
      component: ProductsPage,
      beforeEnter: (to, from, next) => {
        if (!store.getters.get.username) {
          return next({
            name: 'login',
          });
        }
        next();
      },
    },
    { path: '/reviews', component: ReviewsPage },
    {
      path: '/others',
      component: OthersPage,
      beforeEnter: (to, from, next) => {
        if (!store.getters.get.username) {
          return next({
            name: 'login',
          });
        }
        next();
      },
    },
    {
      path: '/write-blog',
      component: WriteBlog,
      beforeEnter: (to, from, next) => {
        if (!store.getters.get.username) {
          return next({
            name: 'login',
          });
        }
        next();
      },
    },
    { path: '/form', component: FormUi },
    {
      path: '/blogs/:blogId',
      component: BlogView,
      props: true,
      beforeEnter: (to, from, next) => {
        if (!store.getters.get.username) {
          return next({
            name: 'login',
          });
        }
        next();
      },
    },
    {
      path: '/profile',
      component: MyProfile,
      props: true,
      beforeEnter: (to, from, next) => {
        if (!store.getters.get.username) {
          return next({
            name: 'login',
          });
        }
        next();
      },
    },
  ],
  linkActiveClass: 'active', // active class for non-exact links.
  linkExactActiveClass: 'active', // active class for *exact* links.
});

export default router;
