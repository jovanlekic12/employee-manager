<script setup lang="ts">
import type { Employee } from "@/utils/types";
import Button from "@/components/Button.vue";
import { toRefs } from "vue";
import { IpEdit } from "vue-icons-plus/ip";
import { useMediaQuery } from "@vueuse/core";

const isSmallScreen = useMediaQuery("(max-width: 850px)");

type Props = {
  employee: Employee;
};

console.log(isSmallScreen.value);

const props = defineProps<Props>();
const emit = defineEmits<{ (e: "toggle-edit", id: string): void }>();
const { employee } = toRefs(props);
</script>
<template>
  <li
    :class="[
      'border-b border-gray-300 pb-3',

      isSmallScreen
        ? 'flex flex-col items-start justify-start'
        : 'grid grid-cols-[1fr_1fr_1fr_1fr_0.5fr_0.5fr_0.5fr] justify-items-center',
    ]"
  >
    <p class="text-md font-medium text-gray-700">
      <span v-if="isSmallScreen" class="mr-2 text-gray-900 font-bold"
        >Full name:</span
      >
      {{ employee.full_name }}
    </p>
    <p class="text-md font-medium text-gray-700">
      <span v-if="isSmallScreen" class="mr-2 text-gray-900 font-bold"
        >Address:</span
      >
      {{ employee.adress }}
    </p>
    <p class="text-md font-medium text-gray-700 self-start">
      <span v-if="isSmallScreen" class="mr-2 text-gray-900 font-bold"
        >Start date:</span
      >
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
      <span v-if="isSmallScreen" class="mr-2 text-gray-900 font-bold"
        >Employment:</span
      >

      {{ employee.employment }}
    </p>
    <p class="text-md font-medium text-gray-700">
      <span v-if="isSmallScreen" class="mr-2 text-gray-900 font-bold"
        >Department:</span
      >
      {{ employee.department }}
    </p>
    <div class="flex items-center gap-3">
      <span v-if="isSmallScreen" class="text-gray-900 font-bold"
        >Completed training:</span
      >
      <input
        type="checkbox"
        v-model="employee.training"
        :class="[
          'w-4 h-4',
          isSmallScreen ? '' : 'justify-self-center self-center',
        ]"
        disabled="true"
      />
    </div>
    <Button type="ghost" @click="emit('toggle-edit', props.employee.id)">
      <IpEdit class="text-emerald-500 w-6 h-6" />
    </Button>
  </li>
</template>
