import type { Employee } from "@/utils/types";

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
  let data: Employee[] = [];
  let count = 0;
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    sort,
    employment,
    department,
  });

  try {
    const response = await fetch(
      `http://localhost:3000/employees?${params.toString()}`,
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
