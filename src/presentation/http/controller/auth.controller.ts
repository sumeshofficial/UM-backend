import type { Request, Response } from "express";
import { RegisterUseCase } from "@application/use-cases/auth/register.usecase";
import { RegisterDtoSchema } from "@application/dtos/auth/register.dto";
import { LoginUseCase } from "@application/use-cases/auth/login.usecase";
import { LoginDtoSchema } from "@application/dtos/auth/login.dto";
import { ResponseHelper } from "../helper/response.helper";
import { AUTH_CONSTANTS } from "@presentation/constants/auth/auth.constants";

export class AuthController {
  constructor(
    private _registerUseCase: RegisterUseCase,
    private _loginUseCase: LoginUseCase
  ) {}

  register = async (req: Request, res: Response) => {
    const dto = RegisterDtoSchema.parse(req.body);
    const user = await this._registerUseCase.execute(dto);
    ResponseHelper.success(
      res,
      user,
      AUTH_CONSTANTS.MESSAGES.USER_REGISTERED_SUCCESSFULLY,
      AUTH_CONSTANTS.CODES.OK
    );
  };

  login = async (req: Request, res: Response) => {
    const dto = LoginDtoSchema.parse(req.body);
    const token = await this._loginUseCase.execute(dto);
    ResponseHelper.success(
      res,
      token,
      AUTH_CONSTANTS.MESSAGES.LOGIN_SUCCESSFULLY,
      AUTH_CONSTANTS.CODES.OK
    );
  };

  getMe = async (req: Request, res: Response) => {
    const user = req.user;
    const data = {
      id: user?.sub,
      email: user?.email,
    };

    
    ResponseHelper.success(
      res,
      data,
      AUTH_CONSTANTS.MESSAGES.USER_FETCHED_SUCCESSFULLY,
      AUTH_CONSTANTS.CODES.OK
    );
  };
}
