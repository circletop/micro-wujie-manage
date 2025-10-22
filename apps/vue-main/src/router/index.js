import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home/index.vue"),
    },
    {
      path: "/map",
      name: "map",
      component: () => import("@/views/Map/index.vue"),
    },
    {
      path: "/vue1",
      name: "vue1",
      component: () => import("@/views/MicroApps/Vue1.vue"),
    },
    {
      path: "/vue2",
      name: "vue2",
      component: () => import("@/views/MicroApps/Vue2.vue"),
    },
    {
      path: "/react",
      name: "react",
      component: () => import("@/views/MicroApps/React.vue"),
    }
  ]
});

export default router;