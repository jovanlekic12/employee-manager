<script setup lang="ts">
import { FiDelete, FiSave } from "vue-icons-plus/fi";
import Button from "@/components/Button.vue";
type Props = {
  departmentFilters: string[];
  employmentFilters: string[];
};

const props = defineProps<Props>();
</script>

<template>
  <form>
    <input type="text" class="border-1 px-1 py-1 rounded-md" />
    <input type="text" class="border-1 px-1 py-1 rounded-md" />
    <input type="date" class="border-1 px-1 py-1 rounded-md" />
    <select name="" id="" class="border-1 px-1 py-1 rounded-md">
      <option v-for="filter in employmentFilters">{{ filter }}</option>
    </select>
    <select name="" id="" class="border-1 px-1 py-1 rounded-md">
      <option v-for="filter in departmentFilters">{{ filter }}</option>
    </select>
    <input
      type="checkbox"
      class="w-4 h-4 self-center justify-self-center"
      disabled="true"
    />
    <Button type="ghost">
      <FiSave class="text-emerald-500 w-6 h-6" />
    </Button>
    <Button type="ghost"><FiDelete class="text-red-500 w-6 h-6" /></Button>
  </form>
</template>
