import { UseCase } from "./use-case.interface";
import { UserDTO } from "@domain/entities/user.entity";

export interface IGetAllUsersUseCase extends UseCase<void, UserDTO[]> {}