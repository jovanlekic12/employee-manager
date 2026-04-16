import { getUserData } from "@/api/users";
import Dashboard from "@/pages/Dashboard/Dashboard.vue";
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
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
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
  // @ts-ignore
  const token = await cookieStore.get("access_token");
  const isAuthRoute = to.name === "LogIn" || to.name === "SignUp";

  if (!token && !isAuthRoute) return { name: "LogIn" };
  if (token && isAuthRoute) return { name: "Home" };

  if (token) {
    try {
      const user = await getUserData(token.value as string);

      if (!user) {
        // @ts-ignore
        await cookieStore.delete("access_token");
        userStore.setUser(null);
        return { name: "LogIn" };
      }

      userStore.setUser(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      // @ts-ignore
      await cookieStore.delete("access_token");
      userStore.setUser(null);
      return { name: "LogIn" };
    }
  }
});

export default router;
