<script setup lang="ts">
import apiClient from "@/components/api/apiClient";
import { onMounted, ref } from "vue";

type Props = {
  activeDepartment: string;
  activeEmployment: string;
};

const props = defineProps<Props>();

const employmentFilters = ref<string[]>([]);
const departmentFilters = ref<string[]>([]);

const emit = defineEmits<{
  (e: "update:activeEmployment", value: string): void;
  (e: "update:activeDepartment", value: string): void;
}>();

const getFilters = async () => {
  try {
    const [employmentResponse, departmentResponse] = await Promise.all([
      apiClient.get("/employment"),
      apiClient.get("/department"),
    ]);

    employmentFilters.value = ["All", ...employmentResponse.data.data];
    departmentFilters.value = ["All", ...departmentResponse.data.data];
  } catch (error) {
    console.error("Error fetching filters:", error);
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
          @click="emit('update:activeDepartment', filter)"
          :class="[
            'py-1 rounded-xl font-medium cursor-pointer duration-200',
            props.activeDepartment === filter ? 'bg-blue-400 text-white' : '',
          ]"
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
          @click="emit('update:activeEmployment', filter)"
          :class="[
            'py-1 rounded-xl font-medium cursor-pointer duration-200',
            props.activeEmployment === filter ? 'bg-blue-400 text-white' : '',
          ]"
        >
          {{ filter }}
        </button>
      </div>
    </div>
  </aside>
</template>
