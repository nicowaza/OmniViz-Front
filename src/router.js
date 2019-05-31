import Vue from 'vue';
import Router from 'vue-router';
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    // {
    //   path: '/live',
    //   name: 'StudentViz',
    //   component: () => import('./views/StudentViz.vue'),
    // },
    {
      path: '/student/viz',
      name: 'StudentViz',
      component: () => import('./views/StudentViz.vue'),
    },
    {
      path: '/',
      name: 'Teacher',
      component: () => import('./views/TeacherViz.vue'),
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
