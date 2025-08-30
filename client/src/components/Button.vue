<script setup lang="ts">
import { RouterLink } from "vue-router";
import { computed } from "vue";

type ButtonType = "primary" | "secondary" | "small" | "round" | "ghost";

type ButtonProps = {
  disabled?: boolean;
  to?: string;
  type: ButtonType;
  isActive?: boolean;
};

const props = defineProps<ButtonProps>();
const emit = defineEmits<{ (e: "click", event: MouseEvent): void }>();

const base =
  "cursor-pointer sm:text-md text-sm bg-blue-400 font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-white disabled:border disabled:border-yellow-400";

const classes = computed(() => {
  const map: Record<ButtonType, string> = {
    primary: base + " flex items-center gap-1 px-3 py-1.5 rounded-xl",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    ghost: "bg-transparent cursor-pointer",
    round: base + " flex items-center justify-center w-9 h-9 rounded-[50%]",
    secondary:
      `flex items-center justify-center gap-2 capitalize ` +
      (props.isActive
        ? "bg-blue-400 text-white"
        : "bg-white text-blue-400 hover:bg-blue-200") +
      " rounded-xl py-1 px-4 text-md font-semibold cursor-pointer duration-200",
  };
  return map[props.type];
});
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes">
    <slot />
  </RouterLink>

  <button
    v-else
    :disabled="props.disabled"
    :class="classes"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
