import { HttpStatusCode } from "@shared/constants/http-status";
import { AppException } from "@shared/errors/app.exception";
import { ErrorCodes } from "@shared/errors/error-codes";

export class UserNotFoundException extends AppException {
    constructor() {
        super(ErrorCodes.USER_NOTFOUND, HttpStatusCode.NOT_FOUND);
    }
}