import { SignupUseCase } from './SignupUseCase';
import { userRepository } from '../../repository';
import { roleRepository } from '../../../role/repository';

const getSignupUseCase = new SignupUseCase(userRepository, roleRepository);

export { getSignupUseCase };
