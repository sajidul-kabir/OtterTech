import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/home/HomePage.vue';
import LoginUser from './pages/auth/LoginUser.vue';
import RegisterUser from './pages/auth/RegisterUser.vue';
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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginUser },
    { path: '/register', component: RegisterUser },
    { path: '/technology', component: TechPage },
    { path: '/gaming', component: GamingPage },
    { path: '/entertainment', component: EntertainmentPage },
    { path: '/products', component: ProductsPage },
    { path: '/reviews', component: ReviewsPage },
    { path: '/others', component: OthersPage },
    { path: '/write-blog', component: WriteBlog },
    { path: '/form', component: FormUi },
    { path: '/blogs/:blogId', component: BlogView, props: true },
    { path: '/profile', component: MyProfile, props: true },
  ],
  linkActiveClass: 'active', // active class for non-exact links.
  linkExactActiveClass: 'active', // active class for *exact* links.
});

export default router;
