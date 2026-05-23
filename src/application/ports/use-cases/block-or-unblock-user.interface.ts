import { UpdateUserDto } from "@application/dtos/user/update-user.dto";
import { UseCase } from "./use-case.interface";
import { UserDTO } from "@domain/entities/user.entity";

export interface IBlockOrUnBlockUserUseCase extends UseCase<UpdateUserDto, UserDTO> {}