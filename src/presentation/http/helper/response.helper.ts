import { ApiResponse } from '@presentation/types/api.types';
import { HttpStatusCode } from '@shared/constants/http-status';
import { Response } from 'express';

type API_RESPONSE_CODES = (typeof HttpStatusCode)[keyof typeof HttpStatusCode];

export class ResponseHelper {
  static success<T>(
    res: Response,
    data: T,
    message: string,
    code: API_RESPONSE_CODES = HttpStatusCode.OK,
  ): Response<ApiResponse<T>> {
    return res.status(code).json({
      success: true,
      data,
      message
    });
  }
}