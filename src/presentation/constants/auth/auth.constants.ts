import { HttpStatusCode } from "@shared/constants/http-status";

export const AUTH_MESSAGES = {
    USER_REGISTERED_SUCCESSFULLY:
        'User registered successfully',
    LOGIN_SUCCESSFULLY: 'Login successful',
    USER_FETCHED_SUCCESSFULLY: 'User fetched successfully',
};

export const AUTH_CONSTANTS = {
    MESSAGES: AUTH_MESSAGES,
    CODES: HttpStatusCode,
};