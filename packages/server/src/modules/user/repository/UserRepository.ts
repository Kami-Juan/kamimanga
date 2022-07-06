type IUserRepository = {
  existUser(): Promise<boolean>;
};

export class UserRepository implements IUserRepository {
  existUser(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
