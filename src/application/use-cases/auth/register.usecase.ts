import type { RegisterDto } from "@application/dtos/auth/register.dto";
import { UserExistsException } from "@application/errors/auth/user-exists.exception";
import { UserQueuePort } from "@application/ports/queues/user.queue";
import { PasswordHasher } from "@application/ports/services/password-hasher.service";
import { IRegisterUseCase } from "@application/ports/use-cases/register.interface";
import { User, type UserDTO } from "@domain/entities/user.entity";
import type { UserRepository } from "@domain/repositories/user.repository";

export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _passwordHasher: PasswordHasher,
    private readonly _userQueue: UserQueuePort
  ) {}

  private async _ensureUserDoesNotExist(email: string): Promise<void> {
    const existingUser = await this._userRepository.findByEmail(email);

    if (existingUser) {
      throw new UserExistsException();
    }
  }

  async execute(input: RegisterDto): Promise<UserDTO> {
    await this._ensureUserDoesNotExist(input.email);

    const passwordHash = await this._passwordHasher.hash(input.password);

    const user = User.create({
      fullname: input.fullname,
      email: input.email,
      passwordHash: passwordHash,
    });

    await this._userRepository.save(user);

    await this._userQueue.syncCreatedUserJob({
      postgresId: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role ,
      status: user.status,
    });

    return user.toPrimitives();
  }
}
