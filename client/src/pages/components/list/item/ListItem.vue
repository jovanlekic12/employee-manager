<script setup lang="ts">
import type { Employee } from "@/utils/types";
import Button from "@/components/Button.vue";
import { toRefs } from "vue";
import { IpEdit } from "vue-icons-plus/ip";
type Props = {
  employee: Employee;
};

const props = defineProps<Props>();
const emit = defineEmits<{ (e: "toggle-edit", id: string): void }>();
const { employee } = toRefs(props);
</script>
<template>
  <li
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
    <Button type="ghost" @click="emit('toggle-edit', props.employee.id)">
      <IpEdit class="text-emerald-500 w-6 h-6" />
    </Button>
  </li>
</template>
