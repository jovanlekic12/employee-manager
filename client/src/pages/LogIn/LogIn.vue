<script setup lang="ts">
import Button from "@/components/Button.vue";
import router from "@/router";
import type { Tokens } from "@/utils/types";
import axios from "axios";
import { AxiosError } from "axios";
import { ref } from "vue";

const email = ref("");
const password = ref("");

const errors = ref<Record<string, string>>({});
const isPending = ref(false);

const handleLogin = async () => {
  errors.value = {};
  isPending.value = true;

  try {
    const { data } = await axios.post<Tokens>(
      "http://localhost:3000/api/login",
      { email: email.value, password: password.value },
      { withCredentials: true }
    );

    axios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${data.accessToken}`;

    cookieStore.set("access_token", data.accessToken);

    await router.push("/home");
  } catch (err) {
    const axiosErr = err as AxiosError<{
      errors?: { path: string; msg: string }[];
    }>;

    if (axiosErr.response?.data?.errors) {
      axiosErr.response.data.errors.forEach((e) => {
        errors.value[e.path] = e.msg;
      });
    } else if (axiosErr.response?.status === 401) {
      errors.value["general"] = "Invalid email or password";
    } else {
      console.error("Unexpected error:", err);
      errors.value["general"] = "Something went wrong. Please try again later.";
    }
  } finally {
    isPending.value = false;
  }
};
</script>

<template>
  <div
    class="flex flex-col bg-white shadow-xl shadow-blue-200 px-5 py-12 gap-2 transform rounded-xl mt-30 mx-auto max-w-sm"
  >
    <h1 class="text-3xl font-semibold text-center mb-2">Log In</h1>
    <form class="flex flex-col gap-2" @submit.prevent="handleLogin">
      <div>
        <input
          type="text"
          placeholder="Email"
          class="ring-1 w-full ring-blue-400 py-1 px-1 focus:ring-2 focus:ring-blue-500 outline-0 rounded-md duration-200"
          v-model="email"
        />
        <p v-if="errors.email" class="text-red-500 text-sm">
          {{ errors.email }}
        </p>
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          class="ring-1 w-full ring-blue-400 py-1 px-1 focus:ring-2 focus:ring-blue-500 outline-0 rounded-md duration-200"
          v-model="password"
        />
        <p v-if="errors.password" class="text-red-500 text-sm">
          {{ errors.password }}
        </p>
      </div>
      <div class="mt-2">
        <p v-if="errors.general" class="text-red-500 text-sm text-center">
          {{ errors.general }}
        </p>
        <Button type="primary" class="w-full"> Log in </Button>
      </div>
    </form>
    <div class="flex items-center gap-1 justify-center">
      <p>Don't have an account?</p>
      <RouterLink
        to="/sign-up"
        class="text-blue-400 font-semibold hover:underline"
        >Sign up</RouterLink
      >
    </div>
  </div>
</template>
