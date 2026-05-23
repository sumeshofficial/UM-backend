import type { Request, Response } from "express";
import { BlockOrUnBlockUserUseCase } from "@application/use-cases/user/block-or-unblock-user.usecase";
import { GetAllUsersUseCase } from "@application/use-cases/user/get-all-users.usecase";
import { GetUserUseCase } from "@application/use-cases/user/get-user.usecase";
import { ResponseHelper } from "../helper/response.helper";
import { USER_CONSTANTS } from "@presentation/constants/user/user.constants";
import { GetUserUseCaseInput } from "@application/ports/use-cases/get-user.interface.";
import { UpdateUserDtoSchema } from "@application/dtos/user/update-user.dto";

export class UserController {
  constructor(
    private readonly _getAllUsersUseCase: GetAllUsersUseCase,
    private readonly _getUserUseCase: GetUserUseCase,
    private readonly _blockOrUnBlockUserUseCase: BlockOrUnBlockUserUseCase
  ) {}

  getAllUsers = async (_req: Request, res: Response) => {
    const users = await this._getAllUsersUseCase.execute();
    ResponseHelper.success(
      res,
      users,
      USER_CONSTANTS.MESSAGES.USERS_FETCHED_SUCCESSFULLY,
      USER_CONSTANTS.CODES.OK
    );
  };

  getUser = async (req: Request<{ userId: string }>, res: Response) => {
    const dto: GetUserUseCaseInput = {
      userId: req.params.userId,
    };
    const user = await this._getUserUseCase.execute(dto);
    ResponseHelper.success(
      res,
      user,
      USER_CONSTANTS.MESSAGES.USER_FETCHED_SUCCESSFULLY,
      USER_CONSTANTS.CODES.OK
    );
  };

  blockOrUnBlockUser = async (req: Request<{ userId: string }>, res: Response) => {
    const dto = UpdateUserDtoSchema.parse({
        userId: req.params.userId,
        status: req.body.status
    });
    const user = await this._blockOrUnBlockUserUseCase.execute(dto);
    ResponseHelper.success(
      res,
      user,
      USER_CONSTANTS.MESSAGES.USER_STATUS_UPDATED_SUCCESSFULLY,
      USER_CONSTANTS.CODES.OK
    );
  };
}
