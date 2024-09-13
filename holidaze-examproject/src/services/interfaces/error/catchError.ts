export interface ApiError {
  message?: string;
  errors?: { message: string }[];
}

export interface ApiErrorResponse {
  message?: string;
  errors?: Array<{ message: string }>;
}
