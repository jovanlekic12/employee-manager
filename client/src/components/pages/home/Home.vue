<script setup lang="ts">
import Sidebar from "./components/sidebar/Sidebar.vue";
import EmployeesList from "./components/list/EmployeesList.vue";
import { onMounted, ref, watch } from "vue";
import getEmployees from "@/components/api/employees";
import type { Employee } from "@/utils/types";

const page = ref(1);
const limit = ref(6);
const total = ref(0);
const employees = ref<Employee[]>([]);

const fetchEmployees = async () => {
  const response = await getEmployees(page.value, limit.value);
  employees.value = response.data;
  total.value = response.count;
};

onMounted(fetchEmployees);

watch([page, limit], fetchEmployees);
</script>

<template>
  <header class="w-full text-center py-5">
    <h1 class="text-4xl font-semibold text-gray-900">Employee Manager</h1>
  </header>
  <main
    class="max-w-7xl m-10 mx-auto flex flex-col gap-10 px-5 xl:grid xl:grid-cols-[300px_minmax(900px,_1fr)]"
  >
    <Sidebar />
    <EmployeesList
      :employees="employees"
      :total="total"
      v-model:page="page"
      v-model:limit="limit"
    />
  </main>
</template>
