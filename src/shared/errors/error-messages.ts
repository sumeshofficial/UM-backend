import { ErrorCodes, type ErrorCode } from "./error-codes";

export const ErrorMessages: Record<ErrorCode, string> = {
    [ErrorCodes.USER_EXISTS]: "User with this email already exists",
    [ErrorCodes.UNAUTHORIZED]: "Unauthorized",
    [ErrorCodes.INTERNAL_SERVER_ERROR]: "Internal server error",
    [ErrorCodes.INVALID_CREDENTIALS]: "Invalid credentials",
    [ErrorCodes.VALIDATION_ERROR]: "Validation failed",
    [ErrorCodes.USER_BLOCKED]: "User is blocked",
}