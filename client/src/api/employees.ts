import type { Employee } from "@/utils/types";
import apiClient from "./apiClient";
import type { AxiosResponse } from "axios";

type EmployeesResponse = {
  data: Employee[];
  count: number;
};

export const getEmployees = async (
  page: number,
  limit: number,
  search: string,
  sort: string,
  employment: string,
  department: string
): Promise<EmployeesResponse> => {
  try {
    const response = await apiClient.get("/employees", {
      params: {
        page,
        limit,
        search,
        sort,
        employment,
        department,
      },
    });

    return {
      data: response.data.data as Employee[],
      count: response.data.total as number,
    };
  } catch (error) {
    console.error("Error fetching employees:", error);
    return { data: [], count: 0 };
  }
};

export const editEmployee = async (
  employee: Employee
): Promise<AxiosResponse<{ message: string; employee: Employee }>> => {
  return apiClient.put(`/employees/${employee.id}`, employee);
};

export const deleteEmployee = async (id: string) => {
  try {
    await apiClient.delete(`employees/${id}`);
  } catch (err) {
    console.error("error deleting employee", err);
  }
};

export const addEmployee = async (
  employee: Employee
): Promise<AxiosResponse<{ message: string; employee: Employee }>> => {
  return apiClient.post("/employees", employee);
};
