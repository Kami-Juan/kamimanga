import { Result } from '../../../../core/logic/Result';
import { UseCaseError } from '../../../../core/logic/UseCaseError';

export namespace StoreUserErrors {
  export class UserAlreadyStored extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'The user exist dude!',
      } as UseCaseError);
    }
  }

  export class MissingRole extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'Role not available',
      } as UseCaseError);
    }
  }
}
