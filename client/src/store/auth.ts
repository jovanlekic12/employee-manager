import type { User } from "@/utils/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const user = ref<User>();

  function setUser(newUser: User) {
    user.value = newUser;
  }

  return {
    user,
    setUser,
  };
});
