<script setup lang="ts">
import Sidebar from "./components/sidebar/Sidebar.vue";
import EmployeesList from "./components/list/EmployeesList.vue";
import Header from "./components/header/Header.vue";
import { onMounted, ref, watch } from "vue";
import getEmployees from "@/components/api/employees";
import type { Employee } from "@/utils/types";
import { useRoute } from "vue-router";

const page = ref(1);
const limit = ref(6);
const total = ref(0);
const sort = ref("name-asc");
const searchQuery = ref("");
const employees = ref<Employee[]>([]);
const activeEmployment = ref<string>("All");
const activeDepartment = ref<string>("All");

const fetchEmployees = async () => {
  const response = await getEmployees(
    page.value,
    limit.value,
    searchQuery.value,
    sort.value,
    activeEmployment.value,
    activeDepartment.value
  );
  employees.value = response.data;
  total.value = response.count;
  console.log(searchQuery.value);
};

onMounted(fetchEmployees);

watch(
  [page, limit, searchQuery, activeEmployment, activeDepartment, sort],
  fetchEmployees
);
</script>

<template>
  <section class="max-w-7xl m-10 mx-auto">
    <header class="w-full text-center py-5">
      <h1 class="text-4xl font-semibold text-gray-900">Employee Manager</h1>
    </header>
    <Header
      v-model:searchQuery="searchQuery"
      :total="total"
      v-model:sort="sort"
    />
    <main
      class="flex flex-col gap-10 px-5 xl:grid xl:grid-cols-[300px_minmax(900px,_1fr)]"
    >
      <Sidebar
        v-model:activeEmployment="activeEmployment"
        v-model:activeDepartment="activeDepartment"
      />
      <EmployeesList
        :employees="employees"
        :total="total"
        v-model:page="page"
        v-model:limit="limit"
      />
    </main>
  </section>
</template>
