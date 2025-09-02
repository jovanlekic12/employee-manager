<script setup lang="ts">
import { ImCross } from "vue-icons-plus/im";
import Button from "./Button.vue";
import { deleteEmployee } from "@/api/employees";

type Props = {
  employee: string;
  id: string;
};

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "close-modal", value: boolean): void;
  (e: "delete-employee", id: string): void;
}>();

const handleSubmit = async () => {
  try {
    await deleteEmployee(props.id);
    emits("delete-employee", props.id);
    emits("close-modal", true);
  } catch (err) {
    console.error("something went wrong", err);
  }
};
</script>

<template>
  <div
    class="flex flex-col bg-white px-5 py-12 gap-2 fixed top-1/2 left-1/2 transform max-w-100 -translate-x-1/2 -translate-y-1/2 z-50 rounded-xl"
  >
    <h1 class="text-4xl font-bold mb-4">Delete employee ?</h1>
    <h6 class="text-sm mb-2">
      Are you sure you want to delete {{ props.employee }} permanently ? This
      action cannot be undone.
    </h6>
    <div class="flex items-center gap-3 justify-end">
      <Button type="primary" @click="emits('close-modal', true)">CANCEL</Button>
      <Button
        type="primary"
        class="bg-red-500 hover:bg-red-800"
        @click="handleSubmit"
        >DELETE</Button
      >
    </div>
    <Button
      type="ghost"
      class="absolute top-3 right-3"
      @click="emits('close-modal', true)"
    >
      <ImCross class="w-4 h-4 text-blue-400" />
    </Button>
  </div>
</template>
