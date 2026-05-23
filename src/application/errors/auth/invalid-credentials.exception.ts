import { HttpStatusCode } from "@shared/constants/http-status";
import { AppException } from "@shared/errors/app.exception";
import { ErrorCodes } from "@shared/errors/error-codes";

export class InvalidCredentialsException extends AppException {
    constructor() {
        super(ErrorCodes.INVALID_CREDENTIALS, HttpStatusCode.UNAUTHORIZED);
    }
}