<script setup lang="ts">
import { getEmployees } from "@/api/employees";
import apiClient from "@/api/apiClient";
import type { Employee } from "@/utils/types";
import { onMounted, ref, watch } from "vue";
import Header from "./components/header/Header.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";
import EmployeesList from "./components/list/EmployeesList.vue";
import Overlay from "@/components/Overlay.vue";
import Button from "@/components/Button.vue";
import NewEmployeeForm from "./components/form/NewEmployeeForm.vue";

const page = ref(1);
const limit = ref(6);
const total = ref(0);
const sort = ref("name-asc");
const searchQuery = ref("");
const employees = ref<Employee[]>([]);
const selectEmployment = ref<string[]>([]);
const selectDepartment = ref<string[]>([]);
const isFormOpened = ref<boolean>(false);

const activeEmployment = ref<string>("All");
const activeDepartment = ref<string>("All");
const employmentFilters = ref<string[]>([]);
const departmentFilters = ref<string[]>([]);

const fetchEmployees = async () => {
  const response = await getEmployees(
    page.value,
    limit.value,
    searchQuery.value,
    sort.value,
    activeEmployment.value,
    activeDepartment.value
  );
  employees.value = response.data.map((employee) => {
    return { ...employee, isEditing: false };
  });
  total.value = response.count;
};

const fetchFilters = async () => {
  try {
    const [employmentResponse, departmentResponse] = await Promise.all([
      apiClient.get("/employment"),
      apiClient.get("/department"),
    ]);
    employmentFilters.value = ["All", ...employmentResponse.data.data];
    departmentFilters.value = ["All", ...departmentResponse.data.data];
    selectEmployment.value = [...employmentResponse.data.data];
    selectDepartment.value = [...departmentResponse.data.data];
  } catch (err) {
    console.error("Error fetching filters:", err);
  }
};

const handleEditing = (id: string) => {
  employees.value = employees.value.map((employee: Employee) =>
    id === employee.id
      ? { ...employee, isEditing: !employee.isEditing }
      : { ...employee, isEditing: false }
  );
};

const closeForm = () => {
  isFormOpened.value = false;
};

const handleAddEmployee = (newEmployee: Employee) => {
  employees.value.push(newEmployee);
  closeForm();
  total.value += 1;
};

const handleSubmitEdit = (newEmployee: Employee) => {
  employees.value = employees.value.map((employee) =>
    employee.id === newEmployee.id
      ? { ...employee, ...newEmployee, isEditing: false }
      : employee
  );
};

onMounted(() => {
  fetchEmployees();
  fetchFilters();
});

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
    <Button type="primary" @click="isFormOpened = true">Add employee</Button>
    <Header
      v-model:searchQuery="searchQuery"
      :total="total"
      v-model:sort="sort"
    />
    <main
      class="flex flex-col gap-10 px-5 xl:grid xl:grid-cols-[300px_minmax(900px,_1fr)]"
    >
      <Sidebar
        :employmentFilters="employmentFilters"
        :departmentFilters="departmentFilters"
        v-model:activeEmployment="activeEmployment"
        v-model:activeDepartment="activeDepartment"
      />
      <EmployeesList
        :employmentFilters="selectEmployment"
        :departmentFilters="selectDepartment"
        :employees="employees"
        :total="total"
        v-model:page="page"
        v-model:limit="limit"
        @toggle-edit="handleEditing"
        @submit-edit="handleSubmitEdit"
      />
    </main>
  </section>
  <teleport to="body" v-if="isFormOpened">
    <Overlay />
    <NewEmployeeForm
      :employmentFilters="selectEmployment"
      :departmentFilters="selectDepartment"
      @submit-employee="handleAddEmployee"
      @close-form="closeForm"
    />
  </teleport>
</template>
