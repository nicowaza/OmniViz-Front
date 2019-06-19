import Vue from 'vue';
import Router from 'vue-router';
// import store from './store/index';
// import { ifNotAuthenticated, ifAuthenticated } from './helpers/checkAuth';
// import Home from './views/Home.vue';
// import Auth from './helpers/Auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    // },
    {
      path: '/',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/register',
      name: 'register',
      // beforeEnter: ifNotAuthenticated,
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // beforeEnter: ifNotAuthenticated,
      component: () => import('./views/Login.vue'),
    },
    // {
    //   path: '/live',
    //   name: 'StudentViz',
    //   component: () => import('./views/StudentViz.vue'),
    // },
    {
      path: '/socket/student/viz',
      name: 'StudentViz',
      // beforeEnter: ifAuthenticated,
      component: () => import('./views/StudentViz.vue'),
    },
    {
      path: '/socket/teacher/viz',
      name: 'Teacher',
      // beforeEnter: ifAuthenticated,
      component: () => import('./views/TeacherViz.vue'),
    },
    {
      path: '/socket/roomsList',
      name: 'roomsList',
      component: () => import('./views/RoomsList.vue'),
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!Auth.isAuthenticated()) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath },
//       });
//     } else {
//       next('/');
//     }
//   }
//   next();
// });

export default router;
