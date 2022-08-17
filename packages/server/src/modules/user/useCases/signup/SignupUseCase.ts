import { Either, left, Result, right } from '../../../../core/logic/Result';
import { GenericAppError } from '../../../../core/logic/AppError';
import { StoreUserErrors } from './StoreUserErrors';

import { UserRepository } from '../../repository/UserRepository';
import { RoleRepository } from '../../../role/repository/RoleRepository';
import { PUBLISHER_ROLE } from '../../../../configuration/utils';
import { SignupDTO } from './SignupDTO';
import { UseCase } from '../../../../core/domain/UseCase';
import { z } from 'zod';
import { singupOutputValidator } from '../../validations';

type SafetyUserData = z.infer<typeof singupOutputValidator>;

type Response = Either<StoreUserErrors.UserAlreadyStored | Result<any>, Result<SafetyUserData>>;

export class SignupUseCase implements UseCase<SignupDTO, Promise<Response>> {
  constructor(private userRepository: UserRepository, private roleRepository: RoleRepository) {}

  async execute(request: SignupDTO): Promise<Response> {
    const userAlreadyExists = await this.userRepository.existUser(request.username, request.email);

    if (userAlreadyExists) {
      return left(new StoreUserErrors.UserAlreadyStored()) as Response;
    }

    const publisherRole = await this.roleRepository.getRole(PUBLISHER_ROLE);

    if (!publisherRole) {
      return left(new StoreUserErrors.MissingRole()) as Response;
    }

    try {
      const user = await this.userRepository.createUser(
        request.username,
        request.email,
        request.password,
        publisherRole,
      );

      return right(Result.ok<SafetyUserData>(user)) as Response;
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }
  }
}
