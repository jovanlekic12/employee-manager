<script setup lang="ts">
import type { Employee } from "@/utils/types";
import { IpEdit } from "vue-icons-plus/ip";
import Pagination from "./pagination/Pagination.vue";
type Props = {
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
      <li
        v-for="employee in props.employees"
        :key="`employe-${employee.id}`"
        class="grid grid-cols-[1fr_1fr_1fr_1fr_.5fr_.5fr_.5fr] justify-items-center border-b-1 border-b-gray-300 pb-3"
      >
        <p class="text-md font-medium text-gray-700">
          {{ employee.full_name }}
        </p>
        <p class="text-md font-medium text-gray-700">{{ employee.adress }}</p>
        <p class="text-md font-medium text-gray-700 self-start">
          {{
            new Date(employee.start_date)
              .toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })
              .replace(",", "")
          }}
        </p>
        <p class="text-md font-medium text-gray-700">
          {{ employee.employment }}
        </p>
        <p class="text-md font-medium text-gray-700">
          {{ employee.department }}
        </p>
        <input
          type="checkbox"
          v-model="employee.training"
          class="w-4 h-4 self-center justify-self-center"
          disabled="true"
        />
        <button class="flex items-center justify-center">
          <IpEdit class="text-emerald-700 w-6 h-6" />
        </button>
      </li>
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
