import type { User } from "@/utils/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const user = ref<User | null>();

  function setUser(newUser: User | null) {
    user.value = newUser;
  }

  return {
    user,
    setUser,
  };
});
