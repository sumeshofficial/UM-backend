import type { ErrorRequestHandler } from "express";
import { z, ZodError } from "zod";
import { AppException } from "@shared/errors/app.exception";
import { ErrorCodes } from "@shared/errors/error-codes";
import { ErrorMessages } from "@shared/errors/error-messages";
import { HttpStatusCode } from "@shared/constants/http-status";

export const errorHandlerMiddleware = (): ErrorRequestHandler => {
  return (error, _request, response, _next) => {
    const statusCode = error instanceof AppException ? error.statusCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
    const code =
      error instanceof AppException
        ? error.code
        : ErrorCodes.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof AppException
        ? error.message
        : ErrorMessages.INTERNAL_SERVER_ERROR;

    if (error instanceof ZodError) {
      return response.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        code: ErrorCodes.VALIDATION_ERROR,
        message: ErrorMessages.VALIDATION_ERROR,
        details: z.treeifyError(error),
      });
    }

    return response.status(statusCode).json({
      success: false,
      code,
      message,
    });
  };
};
