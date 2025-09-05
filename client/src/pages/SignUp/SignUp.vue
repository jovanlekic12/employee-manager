<script setup lang="ts">
import { addUser } from "@/api/users";
import Button from "@/components/Button.vue";
import type { ValidationErrorResponse } from "@/utils/types";
import type { AxiosError } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const isPending = ref(false);
const newUser = ref({
  full_name: "",
  email: "",
  password: "",
});

const successMsg = ref("");

const confirmPassword = ref("");
const errors = ref<Record<string, string>>({});

const router = useRouter();

const handleSuccess = () => {
  successMsg.value = "Account successfully created!";

  setTimeout(() => {
    router.push("/log-in");
  }, 3000);
};

const handleSubmit = async () => {
  errors.value = {};
  isPending.value = true;
  try {
    const response = await addUser({
      ...newUser.value,
      confirmPassword: confirmPassword.value,
    });

    if (response.status === 201 || response.status === 200) {
      handleSuccess();
    }
  } catch (err) {
    const axiosErr = err as AxiosError<ValidationErrorResponse>;
    if (axiosErr.response?.data?.errors) {
      axiosErr.response.data.errors.forEach((e) => {
        console.log(e);
        errors.value[e.path] = e.msg;
      });
    } else {
      console.error("Unexpected error:");
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
    <h1 class="text-3xl font-semibold text-center mb-2">Sign Up</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
      <div>
        <input
          type="text"
          placeholder="Full name"
          class="ring-1 w-full ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed py-1 px-1 focus:ring-2 focus:ring-blue-500 outline-0 rounded-md duration-200"
          v-model="newUser.full_name"
          :disabled="isPending"
        />
        <p v-if="errors.full_name" class="text-red-500 text-sm">
          {{ errors.full_name }}
        </p>
      </div>

      <div>
        <input
          type="text"
          placeholder="Email"
          class="ring-1 w-full ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed py-1 px-1 focus:ring-2 focus:ring-blue-500 outline-0 rounded-md duration-200"
          v-model="newUser.email"
          :disabled="isPending"
        />
        <p v-if="errors.email" class="text-red-500 text-sm">
          {{ errors.email }}
        </p>
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          class="ring-1 w-full ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed py-1 px-1 focus:ring-2 focus:ring-blue-500 outline-0 rounded-md duration-200"
          v-model="newUser.password"
          :disabled="isPending"
        />
        <p v-if="errors.password" class="text-red-500 text-sm">
          {{ errors.password }}
        </p>
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirm password"
          class="ring-1 w-full ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed py-1 px-1 focus:ring-2 focus:ring-blue-500 outline-0 rounded-md duration-200"
          v-model="confirmPassword"
          :disabled="isPending"
        />
        <p v-if="errors.confirmPassword" class="text-red-500 text-sm">
          {{ errors.confirmPassword }}
        </p>
      </div>
      <Button type="primary" :disabled="isPending" class="mt-2 w-full">
        {{ isPending ? "Signing up..." : "Sign Up" }}
      </Button>
      <h3 v-if="successMsg !== ''" class="text-center text-blue-400 font-bold">
        {{ successMsg }}
      </h3>
    </form>
    <div
      v-if="successMsg === ''"
      class="flex items-center gap-1 justify-center"
    >
      <p>Already have an account?</p>
      <RouterLink
        to="/log-in"
        class="text-blue-400 font-semibold hover:underline"
        >Login</RouterLink
      >
    </div>
  </div>
</template>
