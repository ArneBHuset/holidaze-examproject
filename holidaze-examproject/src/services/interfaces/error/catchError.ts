export interface ApiError {
  message?: string;
  errors?: { message: string }[];
}
