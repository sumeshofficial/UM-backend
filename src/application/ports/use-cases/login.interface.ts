import { LoginDto } from "@application/dtos/auth/login.dto";
import { UseCase } from "./use-case.interface";

export interface ILoginUseCase extends UseCase<
  LoginDto,
  { accessToken: string }
> {}
