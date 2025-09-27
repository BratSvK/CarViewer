export type ResultStatus =
  | "Ok"
  | "Created"
  | "NoContent"
  | "Error"
  | "Invalid"
  | "NotFound"
  | "Forbidden"
  | "Unauthorized"
  | "Conflict"
  | "CriticalError"
  | "Unavailable";

export interface ValidationError {
  identifier: string;
  errorMessage: string;
}

export interface Result<T> {
  value?: T;
  status: ResultStatus;
  successMessage?: string;
  correlationId?: string;
  location?: string;
  errors: string[];
  validationErrors: ValidationError[];
}
