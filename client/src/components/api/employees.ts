import type { Employee } from "@/utils/types";

type EmployeesResponse = {
  data: Employee[];
  count: number;
};

const getEmployees = async (
  page: number,
  limit: number
): Promise<EmployeesResponse> => {
  let data: Employee[] = [];
  let count = 0;

  try {
    const response = await fetch(
      `http://localhost:3000/employees?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();
    data = result.data;
    count = result.total;
  } catch (err) {
    console.error(err);
  }

  return { data, count };
};

export default getEmployees;
