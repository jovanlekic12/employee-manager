<script setup lang="ts">
import Button from "@/components/Button.vue";
import type { Employee, ValidationErrorResponse } from "@/utils/types";
import { ref } from "vue";
import { addEmployee } from "@/api/employees";
import type { AxiosError } from "axios";
import { ImCross } from "vue-icons-plus/im";

type Props = {
  employmentFilters: string[];
  departmentFilters: string[];
};

const props = defineProps<Props>();

const newEmployee = ref<Employee>({
  id: crypto.randomUUID(),
  full_name: "",
  adress: "",
  start_date: "",
  employment: "",
  department: "",
  training: false,
});

const emits = defineEmits<{
  (e: "submit-employee", value: Employee): void;
  (e: "close-form", value: boolean): void;
}>();

const errors = ref<Record<string, string>>({});

const handleSubmit = async (): Promise<void> => {
  errors.value = {}; // reset errors

  try {
    const response = await addEmployee(newEmployee.value);
    if (response.status === 201) {
      emits("submit-employee", response.data.employee);
    }
  } catch (err) {
    const axiosErr = err as AxiosError<ValidationErrorResponse>;
    if (axiosErr.response?.data?.errors) {
      // Map backend errors using `path`
      axiosErr.response.data.errors.forEach((e) => {
        errors.value[e.path] = e.msg;
      });
    } else {
      console.error("Unexpected error:", err);
    }
  }

  console.log(errors.value); // now this will show the field errors
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col bg-white px-5 py-12 gap-2 fixed top-1/2 left-1/2 min-w-sm transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-xl"
  >
    <div>
      <input
        type="text"
        class="border text-lg px-1 rounded-md text-center w-full"
        placeholder="Full name"
        v-model="newEmployee.full_name"
      />
      <p v-if="errors.full_name" class="text-red-500 text-sm">
        {{ errors.full_name }}
      </p>
    </div>

    <div>
      <input
        type="text"
        class="border text-lg px-1 rounded-md text-center w-full"
        placeholder="Address"
        v-model="newEmployee.adress"
      />
      <p v-if="errors.adress" class="text-red-500 text-sm">
        {{ errors.adress }}
      </p>
    </div>

    <div>
      <input
        type="date"
        class="border text-lg px-1 rounded-md text-center w-full"
        v-model="newEmployee.start_date"
      />
      <p v-if="errors.start_date" class="text-red-500 text-sm">
        {{ errors.start_date }}
      </p>
    </div>

    <div>
      <select
        v-model="newEmployee.employment"
        class="border rounded-md text-center text-lg w-full"
      >
        <option v-for="filter in props.employmentFilters" :key="filter">
          {{ filter }}
        </option>
      </select>
      <p v-if="errors.employment" class="text-red-500 text-sm">
        {{ errors.employment }}
      </p>
    </div>

    <div>
      <select
        v-model="newEmployee.department"
        class="border rounded-md text-lg text-center w-full"
      >
        <option v-for="filter in props.departmentFilters" :key="filter">
          {{ filter }}
        </option>
      </select>
      <p v-if="errors.department" class="text-red-500 text-sm">
        {{ errors.department }}
      </p>
    </div>

    <div
      class="flex items-center justify-between border rounded-md px-1 py-0.5"
    >
      <h4>Completed training?</h4>
      <input
        type="checkbox"
        class="w-4 h-4 self-center justify-self-center"
        v-model="newEmployee.training"
      />
    </div>

    <Button type="primary" class="justify-center mt-4">
      ADD NEW EMPLOYEE
    </Button>
    <Button
      type="ghost"
      class="absolute top-3 right-3"
      @click.prevent="emits('close-form', true)"
    >
      <ImCross class="w-4 h-4 text-blue-400" />
    </Button>
  </form>
</template>
