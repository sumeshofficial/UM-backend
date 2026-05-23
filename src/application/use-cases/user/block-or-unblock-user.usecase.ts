import { UpdateUserDto } from "@application/dtos/user/update-user.dto";
import { UserNotFoundException } from "@application/errors/user/user-not-found.exception";
import { UserQueuePort } from "@application/ports/queues/user.queue";
import { IBlockOrUnBlockUserUseCase } from "@application/ports/use-cases/block-or-unblock-user.interface";
import { UserDTO } from "@domain/entities/user.entity";
import { UserRepository } from "@domain/repositories/user.repository";
import { UserStatus } from "@domain/value-objects/user-status";

export class BlockOrUnBlockUserUseCase implements IBlockOrUnBlockUserUseCase {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _userQueue: UserQueuePort
  ) {}

  async execute(request: UpdateUserDto): Promise<UserDTO> {
    const { userId, status } = request;

    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    switch (status) {
      case UserStatus.active().getValue():
        user.unblock();
        break;

      case UserStatus.blocked().getValue():
        user.block();
        break;
    }

    await this._userRepository.save(user);

    await this._userQueue.syncUpdatedUserJob({
      userId,
      updates: {
        status: user.status,
        isBlocked: user.isBlocked,
      },
    });

    return user.toPrimitives();
  }
}
