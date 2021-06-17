import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      // ...
      if (JSON.parse(localStorage.getItem('token'))) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../components/form/Register.vue"),
    beforeEnter: (to, from, next) => {
      // ...
      if (!JSON.parse(localStorage.getItem('token'))) {
        next()
      } else {
        next({
          path: '/'
        })
      }
    }
  },

  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../components/form/Login.vue"),
    beforeEnter: (to, from, next) => {
      // ...
      if (!JSON.parse(localStorage.getItem('token'))) {
        next()
      } else {
        next({
          path: '/'
        })
      }
    }
  },
  {
    path: "/account",
    name: "Account",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Profile.vue"),
    beforeEnter: (to, from, next) => {
      // ...
      if (JSON.parse(localStorage.getItem('token'))) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  },
  {
    path: "/admin",
    name: "Admin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../components/account/Admin.vue"),
    beforeEnter: (to, from, next) => {
      // ...
      if (JSON.parse(localStorage.getItem('token'))) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  },

  {
    path: "/publication/:id",
    name: "onePublication",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../components/publication/OnePublication"),
    beforeEnter: (to, from, next) => {
      // ...
      if (JSON.parse(localStorage.getItem('token'))) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  },
  {
    path: "/create-publication",
    name: "CreatePublication",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../components/form/publication"),
    beforeEnter: (to, from, next) => {
      // ...
      if (JSON.parse(localStorage.getItem('token'))) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  },
  {
    path: "/userAccount/:id",
    name: "UserAccount",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../components/account/UserProfile"),
    beforeEnter: (to, from, next) => {
      // ...
      if (JSON.parse(localStorage.getItem('token'))) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  },
  {
    path: "/parametre-compte",
    name: "parametreCompte",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../components/form/compte"),
    beforeEnter: (to, from, next) => {
      // ...
      if (JSON.parse(localStorage.getItem('token'))) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  },
  {
    path: "/*",
    name: "NotFound",
    component: () =>
      import( /*webpackChunkName: "notFound" */ "../views/NotFound.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;