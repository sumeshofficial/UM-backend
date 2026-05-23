import { UserNotFoundException } from "@application/errors/user/user-not-found.exception";
import {
  GetUserUseCaseInput,
  IGetUserUseCase,
} from "@application/ports/use-cases/get-user.interface.";
import { UserDTO } from "@domain/entities/user.entity";
import { UserRepository } from "@domain/repositories/user.repository";

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private readonly _userRepository: UserRepository) {}
  async execute(request: GetUserUseCaseInput): Promise<UserDTO> {
    const { userId } = request;

    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user.toPrimitives();
  }
}
