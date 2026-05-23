import { HttpStatusCode } from "@shared/constants/http-status";
import { AppException } from "@shared/errors/app.exception";
import { ErrorCodes } from "@shared/errors/error-codes";

export class UnauthorizedException extends AppException {
  constructor() {
    super(ErrorCodes.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
  }
}