import { getUserData } from "@/api/users";
import Home from "@/pages/Home/Home.vue";
import LogIn from "@/pages/LogIn/LogIn.vue";
import SignUp from "@/pages/SignUp/SignUp.vue";
import { useUserStore } from "@/store/auth";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/log-in",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    redirect: "/log-in",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const userToken = await cookieStore.get("access_token");
  const isAuthenticationRoute = to.name === "LogIn" || to.name === "SignUp";

  if (!userToken && !isAuthenticationRoute) return { name: "LogIn" };
  if (userToken && isAuthenticationRoute) return { name: "Home" };
  if (userToken) {
    const { data: user } = await getUserData(userToken.value as string);
    console.log(userToken.value);
    userStore.setUser(user);
    if (user?.isAdmin === false && to.name !== "Home") {
      return { name: "Home" };
    }
  }
});

export default router;
