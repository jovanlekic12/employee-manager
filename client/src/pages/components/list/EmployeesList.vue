<script setup lang="ts">
import type { Employee } from "@/utils/types";
import Pagination from "./pagination/Pagination.vue";
import ListItem from "./item/ListItem.vue";
import EditListItem from "./editingItem/EditListItem.vue";
type Props = {
  departmentFilters: string[];
  employmentFilters: string[];
  employees: Employee[];
  total: number;
  limit: number;
  page: number;
};

const props = defineProps<Props>();

const employeeInfos: string[] = [
  "Full Name",
  "Address",
  "Start Date",
  "Employment",
  "Department",
  "Training",
  "Actions",
];
const emit = defineEmits<{
  (e: "update:page", value: number): void;
  (e: "update:limit", value: number): void;
  (e: "toggle-edit", id: string): void;
}>();
</script>

<template>
  <section>
    <header
      class="grid grid-cols-[1fr_1fr_1fr_1fr_.5fr_.5fr_.5fr] justify-items-center"
    >
      <h6 v-for="info in employeeInfos" class="font-bold text-gray-800">
        {{ info }}
      </h6>
    </header>
    <ul class="flex flex-col gap-3 mt-3">
      <template v-for="employee in props.employees" :key="employee.id">
        <EditListItem
          v-if="employee.isEditing"
          :employee="employee"
          :employmentFilters="employmentFilters"
          :departmentFilters="departmentFilters"
        />
        <ListItem
          v-else
          :employee="employee"
          @toggle-edit="emit('toggle-edit', employee.id)"
        />
      </template>
    </ul>

    <Pagination
      :page="props.page"
      :limit="props.limit"
      :total="props.total"
      @update:page="$emit('update:page', $event)"
      @update:limit="$emit('update:limit', $event)"
    />
  </section>
</template>
