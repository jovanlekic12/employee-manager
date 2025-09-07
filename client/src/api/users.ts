import type { NewUser, User } from "@/utils/types";
import type { AxiosResponse } from "axios";
import apiClient from "./apiClient";

export const addUser = async (
  newUser: NewUser & { confirmPassword: string }
): Promise<AxiosResponse<{ message: string; newUser: NewUser }>> => {
  return apiClient.post("/users", newUser);
};

export const getUserData = async (token: string): Promise<User | null> => {
  try {
    const response: AxiosResponse<User> = await apiClient.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUsers = async (token: string): Promise<User[] | null> => {
  try {
    const response: AxiosResponse<User[]> = await apiClient.get("/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};
