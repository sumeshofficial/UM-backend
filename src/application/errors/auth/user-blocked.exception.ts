import { HttpStatusCode } from "@shared/constants/http-status";
import { AppException } from "@shared/errors/app.exception";
import { ErrorCodes } from "@shared/errors/error-codes";

export class UserBlockedException extends AppException {
  constructor() {
    super(ErrorCodes.USER_BLOCKED, HttpStatusCode.FORBIDDEN);
  }
}