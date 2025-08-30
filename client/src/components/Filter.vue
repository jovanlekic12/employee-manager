<script setup lang="ts">
import Button from "./Button.vue";
type Props = {
  title: string;
  filters: string[];
  activeFilter: string;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:activeFilter", value: string): void;
}>();
</script>

<template>
  <div>
    <h4 class="text-xl font-medium text-gray-800">{{ props.title }}</h4>
    <div class="grid grid-cols-2 gap-2 pt-2">
      <Button
        v-for="filter in props.filters"
        :key="filter"
        @click="emit('update:activeFilter', filter)"
        type="secondary"
        :is-active="props.activeFilter === filter"
      >
        {{ filter }}
      </Button>
    </div>
  </div>
</template>
