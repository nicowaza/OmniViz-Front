import Vue from 'vue';
import Router from 'vue-router';
import authentication from './store/authentication';

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
      meta: { requiresAuth: true },
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
    {
      path: '/createClass',
      name: 'CreateClass',
      // beforeEnter: ifNotAuthenticated,
      component: () => import('./views/CreateClass.vue'),
    },

    {
      path: '/student/viz',
      name: 'StudentViz',
      // beforeEnter: isAuthenticated,
      component: () => import('./views/StudentViz.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/teacher',
      name: 'Teacher',
      // beforeEnter: isAuthenticated,
      component: () => import('./views/TeacherViz.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/roomsList',
      name: 'roomsList',
      // beforeEnter: isAuthenticated,
      component: () => import('./views/RoomsList.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(`navigation to ${to.name} from ${from.name}`);
  if (to.meta.requiresAuth) {
    if (authentication.getters.isLoggedIn) {
      next();
    } else {
      next({
        name: 'login',
      });
    }
  } else {
    next();
  }
});
// isAuthenticated()
//   .then(({ data }) => {
//     console.log(data);
//     if (data.isAuthenticated === false) {
//       router.push('/login');
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// next();
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
// });

// function checkAuth() {
//   return isAuthenticated()
//     .then(({ data }) => {
//       console.log(data);
//       if (data.isAuthenticated === false) {
//         router.push('/login');
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
export default router;
