import { EntityRepository } from '@mikro-orm/sqlite';
import { User } from './user.entity.js';
import { AuthError } from '../common/utils.js';

export class UserRepository extends EntityRepository<User> {
  async exists(email: string) {
    const count = await this.count({ email });
    return count > 0;
  }

  async login(email: string, password: string) {
    // we use a more generic error so we don't leak such email is registered
    const err = new AuthError('Invalid combination of email and password');
    const user = await this.findOneOrFail(
      { email },
      {
        populate: ['password'], // password is a lazy property, we need to populate it
        failHandler: () => err,
      }
    );

    if (await user.verifyPassword(password)) {
      return user;
    }

    throw err;
  }
}
