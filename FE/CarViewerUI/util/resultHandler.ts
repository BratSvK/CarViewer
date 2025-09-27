import { Result } from "../types/result";

/**
 * Generic handler for Ardalis.Result<T> responses
 * - Returns value if successful
 * - Throws a descriptive Error otherwise
 */
export function handleResult<T>(result: Result<T>): T {
  const isSuccess =
    result.status === "Ok" ||
    result.status === "Created" ||
    result.status === "NoContent";

  if (!isSuccess) {
    if (result.validationErrors?.length) {
      const validationMessage = result.validationErrors
        .map((v) => `${v.identifier}: ${v.errorMessage}`)
        .join(", ");
      throw new Error(`Validation failed: ${validationMessage}`);
    }

    if (result.errors?.length) {
      throw new Error(result.errors.join(", "));
    }

    throw new Error(`Request failed with status: ${result.status}`);
  }

  if (!result.value && result.status !== "NoContent") {
    throw new Error("Empty response value from server");
  }

  return result.value as T;
}
