import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Cr from "../views/Create.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/create",
    name: "Create",

    component: () =>
      import(/* webpackChunkName: "create" */ "../views/Create.vue"),
  },
  {
    path: "/update/:id",
    name: "Update",

    component: () =>
      import(/* webpackChunkName: "update" */ "../views/Update.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
