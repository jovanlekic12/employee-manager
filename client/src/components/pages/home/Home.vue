<script setup lang="ts">
import Sidebar from "./components/sidebar/Sidebar.vue";
import EmployeesList from "./components/list/EmployeesList.vue";
</script>

<template>
  <header class="w-full text-center py-5">
    <h1 class="text-4xl font-semibold text-gray-900">Employee Manager</h1>
  </header>
  <main
    class="max-w-7xl m-10 mx-auto flex flex-col gap-10 px-5 xl:grid xl:grid-cols-[300px_minmax(900px,_1fr)]"
  >
    <Sidebar />
    <EmployeesList />
  </main>
</template>
