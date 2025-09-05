export type Employee = {
  id: string;
  full_name: string;
  adress: string;
  start_date: string;
  employment: string;
  department: string;
  training: boolean;
  isEditing?: boolean;
};
export type ValidationError = {
  msg: string;
  path: string;
  location: string;
  value?: any;
};

export type ValidationErrorResponse = {
  errors: ValidationError[];
};

export type NewUser = {
  full_name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  full_name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
