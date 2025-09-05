import type { NewUser } from "@/utils/types";
import type { AxiosResponse } from "axios";
import apiClient from "./apiClient";

export const addUser = async (
  newUser: NewUser & { confirmPassword: string }
): Promise<AxiosResponse<{ message: string; newUser: NewUser }>> => {
  return apiClient.post("/users", newUser);
};

export const getUserData = async (token: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
