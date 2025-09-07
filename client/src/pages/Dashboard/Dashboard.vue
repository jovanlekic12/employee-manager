<script setup lang="ts">
import { getUsers } from "@/api/users";
import type { User } from "@/utils/types";
import { onMounted, ref } from "vue";
import { ImCheckmark, ImCross } from "vue-icons-plus/im";

const users = ref<User[]>([]);

const userInfos = ["Full name", "Email", "Admin"];

const fetchUsers = async () => {
  try {
    const token = await cookieStore.get("access_token");
    if (!token) return;
    const result = await getUsers(token.value as string);
    result ? (users.value = result) : (users.value = []);
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
<template>
  <main class="max-w-7xl m-10 mx-auto px-2">
    <header class="w-full text-center py-5">
      <h1 class="text-4xl font-semibold text-gray-900">Employee Manager</h1>
    </header>
    <section>
      <header class="grid grid-cols-[1fr_1fr_1fr] justify-items-center">
        <h6 v-for="info in userInfos" class="font-bold text-gray-800">
          {{ info }}
        </h6>
      </header>
      <ul class="mt-5">
        <li
          v-for="user in users"
          :key="`user-${user.id}`"
          class="grid grid-cols-[1fr_1fr_1fr] justify-items-center items-center border-b-1 border-b-solid border-gray-300 py-2"
        >
          <h6 class="font-medium">
            {{ user.full_name }}
          </h6>
          <h6 class="font-medium">
            {{ user.email }}
          </h6>
          <div
            :class="[
              `${user.admin ? 'bg-green-500' : 'bg-red-500'}`,
              ' w-7 h-7 rounded-full relative',
            ]"
          >
            <ImCross
              v-if="!user.admin"
              class="w-4 h-4 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
            />
            <ImCheckmark
              v-else
              class="w-4 h-4 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
            />
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
