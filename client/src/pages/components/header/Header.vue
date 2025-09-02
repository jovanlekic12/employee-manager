<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "@/components/Button.vue";
import { useMediaQuery } from "@vueuse/core";
import { FaBars } from "vue-icons-plus/fa";
type Props = {
  total: number;
  isSidebarOpened: boolean;
};

const props = defineProps<Props>();
const isSmallScreen = useMediaQuery("(max-width: 1280px)");

const emit = defineEmits<{
  (e: "update:searchQuery", value: string): void;
  (e: "update:sort", value: string): void;
  (e: "open-sidebar"): void;
}>();

const searchQuery = ref("");

let debounceTimer: number | undefined;

watch(searchQuery, (newVal) => {
  clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => {
    emit("update:searchQuery", newVal);
  }, 300);
});

const sorts = [
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
  { label: "Training Trained to Untrained", value: "training-desc" },
  { label: "Training Untrained to Trained", value: "training-asc" },
  { label: "Date: Newest to Oldest", value: "date-desc" },
  { label: "Date: Oldest to Newest", value: "date-asc" },
];
</script>

<template>
  <header class="flex items-center justify-between px-2 py-3 mb-2">
    <div class="flex items-center gap-3">
      <Button v-if="isSmallScreen" type="primary" @click="emit('open-sidebar')"
        ><FaBars
      /></Button>
      <h3 class="text-lg font-medium">Found {{ props.total }} employees</h3>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="border-1 px-1 py-1 xl:min-w-sm rounded-md"
      />
    </div>
    <div class="flex items-center gap-2">
      <label for="sort">Sort by:</label>
      <select
        name="sort"
        class="border-1 px-1 py-1 xl:min-w-sm rounded-md"
        @change="
          emit('update:sort', ($event.target as HTMLSelectElement).value)
        "
      >
        <option v-for="sort in sorts" :value="sort.value" :key="sort.value">
          {{ sort.label }}
        </option>
      </select>
    </div>
  </header>
</template>
