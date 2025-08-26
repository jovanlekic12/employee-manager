<script setup lang="ts">
import { onMounted, ref } from "vue";

const employmentFilters = ref<string[]>([]);
const departmentFilters = ref<string[]>([]);

const activeEmployment = ref<string>("All");
const activeDepartment = ref<string>("All");

const getFilters = async () => {
  try {
    const employmentResponse = await fetch("http://localhost:3000/employment", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const departmentResponse = await fetch("http://localhost:3000/department", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const employmentResult = await employmentResponse.json();
    const departmentResult = await departmentResponse.json();
    employmentFilters.value = ["All", ...employmentResult];
    departmentFilters.value = ["All", ...departmentResult];
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getFilters();
});
</script>

<template>
  <aside class="flex flex-col align-middle gap-5">
    <div>
      <h4 class="text-xl font-medium text-gray-800">Department</h4>
      <div class="grid grid-cols-2 gap-2 pt-2">
        <button
          v-for="filter in departmentFilters"
          @click="activeDepartment = filter"
          :class="`py-1 rounded-xl font-medium cursor-pointer duration-200 ${
            activeDepartment === filter && 'bg-blue-400 text-white'
          }`"
        >
          {{ filter }}
        </button>
      </div>
    </div>
    <div>
      <h4 class="text-xl font-medium text-gray-800">Employment</h4>
      <div class="grid grid-cols-2 gap-2 pt-2">
        <button
          v-for="filter in employmentFilters"
          @click="activeEmployment = filter"
          :class="`py-1 rounded-xl font-medium cursor-pointer duration-200 ${
            activeEmployment === filter && 'bg-blue-400 text-white'
          }`"
        >
          {{ filter }}
        </button>
      </div>
    </div>
  </aside>
</template>
