<script setup lang="ts">
import Filter from "@/components/Filter.vue";
import { useMediaQuery } from "@vueuse/core";
import Button from "@/components/Button.vue";
import { ImCross } from "vue-icons-plus/im";
import Overlay from "@/components/Overlay.vue";
type Props = {
  activeDepartment: string;
  activeEmployment: string;
  departmentFilters: string[];
  employmentFilters: string[];
  isSidebarOpened: boolean;
};
const props = defineProps<Props>();
const isSmallScreen = useMediaQuery("(max-width: 1280px)");

const emit = defineEmits<{
  (e: "update:activeEmployment", value: string): void;
  (e: "update:activeDepartment", value: string): void;
  (e: "close-sidebar"): void;
}>();
</script>

<template>
  <aside
    :class="[
      isSmallScreen ? 'fixed top-1/2 left-1/2 z-99 transform' : '',

      'rounded-xl w-9/10 sm:w-fit bg-white px-5 py-10 duration-300 ease-in-out',

      props.isSidebarOpened && 'translate-x-[-50%] translate-y-[-50%]',

      !props.isSidebarOpened &&
        isSmallScreen &&
        'translate-x-[500%] translate-y-[-50%]',
    ]"
  >
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
    <Button
      type="ghost"
      class="absolute top-3 right-3 z-99"
      @click="emit('close-sidebar')"
      v-if="isSmallScreen"
    >
      <ImCross class="w-4 h-4 text-blue-400" />
    </Button>
  </aside>
  <Overlay v-if="isSmallScreen && isSidebarOpened"></Overlay>
</template>
