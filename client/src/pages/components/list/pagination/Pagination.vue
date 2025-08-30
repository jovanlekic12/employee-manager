<script setup lang="ts">
import { BiSolidChevronLeft, BiSolidChevronRight } from "vue-icons-plus/bi";
import Button from "@/components/Button.vue";
type Props = {
  total: number;
  limit: number;
  page: number;
};
const options = [4, 5, 6, 7, 8];
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:limit", value: number): void;
  (e: "update:page", value: number): void;
}>();
</script>
<template>
  <footer
    class="flex items-center justify-between w-full mt-5 bg-blue-400 text-white rounded-md px-3 py-3.5"
  >
    <div class="flex items-center gap-1">
      <h3 class="font-medium">Show employees per page</h3>
      <select
        :value="props.limit"
        @change="
          emit('update:limit', +($event.target as HTMLSelectElement).value),
            console.log(props.limit)
        "
      >
        <option class="bg-blue-400" v-for="option in options" :key="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="flex items-center gap-2">
      <h3>
        Showing
        {{ (props.page - 1) * props.limit + 1 }}
        to
        {{ Math.min(props.page * props.limit, props.total) }}
        of {{ props.total }}
      </h3>
      <div class="flex items-center gap-1">
        <Button
          type="ghost"
          @click="emit('update:page', props.page - 1)"
          :disabled="props.page <= 1"
        >
          <BiSolidChevronLeft />
        </Button>
        <Button
          type="ghost"
          @click="emit('update:page', props.page + 1)"
          :disabled="props.page * props.limit >= props.total"
        >
          <BiSolidChevronRight />
        </Button>
      </div>
    </div>
  </footer>
</template>
