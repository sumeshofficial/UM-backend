import { UseCase } from "./use-case.interface";
import { UserDTO } from "@domain/entities/user.entity";

export interface GetUserUseCaseInput {
    userId: string;
}

export interface IGetUserUseCase extends UseCase<GetUserUseCaseInput, UserDTO> {}