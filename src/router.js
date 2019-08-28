import Vue from 'vue';
import Router from 'vue-router';
import authentication from './store/authentication';
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
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
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
      component: () => import('./views/CreateClass.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/room/:roomID',
      name: 'Timeline',
      component: () => import('./views/Timeline.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/student/:roomID',
      name: 'StudentViz',
      component: () => import('./views/StudentViz.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/teacher/:roomID',
      name: 'Teacher',
      component: () => import('./views/TeacherViz.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/roomsList',
      name: 'roomsList',
      component: () => import('./views/RoomsList.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(`navigation to ${to.name} from ${from.name}`);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(authentication.state.isLoggedIn);
    if (!authentication.state.isLoggedIn) {
      alert('vous devez être connecté pour accéder à cette page')
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
