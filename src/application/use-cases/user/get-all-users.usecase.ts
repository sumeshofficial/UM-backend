import { IGetAllUsersUseCase } from "@application/ports/use-cases/get-all-users.interface";
import { UserDTO } from "@domain/entities/user.entity";
import { UserRepository } from "@domain/repositories/user.repository";

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(private readonly _userRepository: UserRepository) {}
  async execute(): Promise<UserDTO[]> {
    const users = await this._userRepository.findManyExceptAdmin();

    return users.map((user) => user.toPrimitives());
  }
}
