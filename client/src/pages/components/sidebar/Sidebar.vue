<script setup lang="ts">
import Filter from "@/components/Filter.vue";

type Props = {
  activeDepartment: string;
  activeEmployment: string;
  departmentFilters: string[];
  employmentFilters: string[];
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:activeEmployment", value: string): void;
  (e: "update:activeDepartment", value: string): void;
}>();
</script>

<template>
  <aside class="flex flex-col align-middle gap-5">
    <Filter
      title="Department"
      :filters="props.departmentFilters"
      :activeFilter="props.activeDepartment"
      @update:activeFilter="emit('update:activeDepartment', $event)"
    />

    <Filter
      title="Employment"
      :filters="props.employmentFilters"
      :activeFilter="props.activeEmployment"
      @update:activeFilter="emit('update:activeEmployment', $event)"
    />
  </aside>
</template>
