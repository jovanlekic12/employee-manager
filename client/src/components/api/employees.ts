import type { Employee } from "@/utils/types";
import apiClient from "./apiClient";

type EmployeesResponse = {
  data: Employee[];
  count: number;
};

const getEmployees = async (
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

export default getEmployees;
