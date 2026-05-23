import type { ErrorCode } from "./error-codes";
import { ErrorMessages } from "./error-messages";

export class AppException extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly statusCode: number,
    message?: string,
  ) {
    super(message ?? ErrorMessages[code]);
  }
}