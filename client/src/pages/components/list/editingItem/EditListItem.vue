<script setup lang="ts">
import { ref } from "vue";
import { FiDelete, FiSave } from "vue-icons-plus/fi";
import Button from "@/components/Button.vue";
import type { Employee, ValidationErrorResponse } from "@/utils/types";
import { editEmployee } from "@/api/employees";
import type { AxiosError } from "axios";
import Overlay from "@/components/Overlay.vue";
import { ImCross } from "vue-icons-plus/im";

type Props = {
  departmentFilters: string[];
  employmentFilters: string[];
  employee: Employee;
};

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "submit-edit", employee: Employee): void;
  (e: "toggle-edit", id: string): void;
}>();

// Normalize date for input[type="date"]
function normalizeDate(d: string | null) {
  if (!d) return "";
  return d.length > 10 ? d.substring(0, 10) : d;
}

const { isEditing, ...rest } = props.employee;

const editedEmployee = ref({
  ...rest,
  start_date: normalizeDate(props.employee.start_date),
});

const errors = ref<Record<string, string>>({});
const isModalOpened = ref(false);

const handleSubmit = async () => {
  errors.value = {}; // reset errors

  try {
    await editEmployee(editedEmployee.value);
    emits("submit-edit", editedEmployee.value);
  } catch (err) {
    const axiosErr = err as AxiosError<ValidationErrorResponse>;
    if (axiosErr.response?.data?.errors) {
      // Map backend validation errors
      axiosErr.response.data.errors.forEach((e) => {
        errors.value[e.path] = e.msg;
      });
    } else {
      console.error("Unexpected error:", err);
    }
  }
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="relative grid grid-cols-[1fr_1fr_1fr_1fr_.5fr_.5fr_.5fr] justify-items-center border-b-1 border-b-gray-300 pb-3 pt-5 gap-1"
  >
    <div class="flex flex-col align-center justify-start">
      <input
        type="text"
        class="border-1 text-sm px-1 rounded-md text-center w-35"
        v-model="editedEmployee.full_name"
      />
      <p v-if="errors.full_name" class="text-red-500 text-xs">
        {{ errors.full_name }}
      </p>
    </div>

    <div class="flex flex-col align-center justify-start">
      <input
        type="text"
        class="border-1 text-sm px-1 rounded-md text-center w-35"
        v-model="editedEmployee.adress"
      />
      <p v-if="errors.adress" class="text-red-500 text-xs">
        {{ errors.adress }}
      </p>
    </div>

    <div class="flex flex-col align-center justify-start">
      <input
        type="date"
        class="border-1 text-sm px-1 rounded-md text-center"
        v-model="editedEmployee.start_date"
      />
      <p v-if="errors.start_date" class="text-red-500 text-xs">
        {{ errors.start_date }}
      </p>
    </div>

    <div class="flex flex-col align-center justify-start">
      <select
        class="border-1 rounded-md text-center text-sm"
        v-model="editedEmployee.employment"
      >
        <option v-for="filter in props.employmentFilters" :key="filter">
          {{ filter }}
        </option>
      </select>
      <p v-if="errors.employment" class="text-red-500 text-xs">
        {{ errors.employment }}
      </p>
    </div>

    <div class="flex flex-col align-center justify-start">
      <select
        class="border-1 rounded-md text-sm text-center"
        v-model="editedEmployee.department"
      >
        <option v-for="filter in props.departmentFilters" :key="filter">
          {{ filter }}
        </option>
      </select>
      <p v-if="errors.department" class="text-red-500 text-xs">
        {{ errors.department }}
      </p>
    </div>

    <input
      type="checkbox"
      class="w-4 h-4 self-start mt-1"
      v-model="editedEmployee.training"
    />

    <div class="flex gap-1">
      <Button type="ghost" @click.prevent="handleSubmit">
        <FiSave class="text-emerald-500 w-5 h-5" />
      </Button>
      <Button type="ghost" @click.prevent="isModalOpened = true">
        <FiDelete class="text-red-500 w-5 h-5" />
      </Button>
    </div>
    <Button
      type="ghost"
      class="absolute top-0 right-0"
      @click.prevent="emits('toggle-edit', editedEmployee.id)"
    >
      <ImCross class="w-3 h-3 text-blue-400" />
    </Button>
  </form>
  <teleport to="body">
    <Overlay v-if="isModalOpened" />
  </teleport>
</template>
