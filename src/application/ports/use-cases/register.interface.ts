import { RegisterDto } from "@application/dtos/auth/register.dto";
import { UseCase } from "./use-case.interface";
import { UserDTO } from "@domain/entities/user.entity";

export interface IRegisterUseCase extends UseCase<RegisterDto, UserDTO> {}