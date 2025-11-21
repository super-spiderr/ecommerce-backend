export interface AppError {
  message: string;
  statusCode: number;
  isOperational: boolean;
}

export const createAppError = (
  message: string,
  statusCode = 500,
  isOperational = true
): AppError => {
  return {
    message,
    statusCode,
    isOperational,
  };
};
