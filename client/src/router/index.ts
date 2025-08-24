import { createMemoryHistory, createRouter } from "vue-router";
import Home from "../components/pages/home/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
