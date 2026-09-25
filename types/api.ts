export type ApiErrorResponse = {
  message: string;
  [key: string]: unknown;
};

export type ApiError = {
  message: string;
  status?: number;
  cause?: unknown;
};
