import type { LoginDto } from "@application/dtos/auth/login.dto";
import { InvalidCredentialsException } from "@application/errors/auth/invalid-credentials.exception";
import { UserBlockedException } from "@application/errors/auth/user-blocked.exception";
import { PasswordHasher } from "@application/ports/services/password-hasher.service";
import { TokenService } from "@application/ports/services/token.port";
import { ILoginUseCase } from "@application/ports/use-cases/login.interface";
import type { User } from "@domain/entities/user.entity";
import type { UserRepository } from "@domain/repositories/user.repository";

export class LoginUseCase implements ILoginUseCase {
    constructor(
        private readonly _userRepository: UserRepository,
        private readonly _passwordHasher: PasswordHasher,
        private readonly _tokenService: TokenService,
    ) {}

    private async _getUserOrFail(email: string): Promise<User> {
        const user = await this._userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsException();
        }

        return user;
    }

    private _userBlockedOrNot(user: User): void {
        if (user.isBlocked) {
            throw new UserBlockedException();
        }
    }

    private async _validatePassword(password: string, user: User) {
        const isValid = await this._passwordHasher.compare(
            password,
            user.passwordHashValue
        );

        if (!isValid) {
            throw new InvalidCredentialsException();
        }
    }

    private _generateToken(user: User): string {
        return this._tokenService.generate({
            sub: user.id,
            email: user.email
        });
    }

    async execute(input: LoginDto): Promise<{ accessToken: string }> {
        const user = await this._getUserOrFail(input.email);

        await this._validatePassword(input.password, user);

        this._userBlockedOrNot(user);

        const accessToken = this._generateToken(user);

        return { accessToken };
    }
}