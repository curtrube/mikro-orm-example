import { BeforeCreate, BeforeUpdate, EventArgs, Entity, EntityRepositoryType, Property, OneToMany, Collection } from '@mikro-orm/core';
import crypto from 'crypto';
import { hash, verify } from 'argon2';
import { BaseEntity } from '../common/base.entity.js';
import { UserRepository } from './user.repository.js';
import { Article } from '../article/article.entity.js';

@Entity({ repository: () => UserRepository })
export class User extends BaseEntity<'bio'> {
  // for automatic inference via `em.getRepository(User)`
  [EntityRepositoryType]?: UserRepository;

  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @Property({ hidden: true, lazy: true })
  password!: string;

  @Property({ persist: false })
  token?: string;

  @Property({ type: 'text' })
  bio = '';

  @OneToMany({ mappedBy: 'author' })
  articles = new Collection<Article>(this);

  constructor(fullName: string, email: string, password: string) {
    super();
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword(args: EventArgs<User>) {
    // hash only if the value changed
    const password = args.changeSet?.payload.password;

    if (password) {
      this.password = await hash(password);
    }
  }

  async verifyPassword(password: string) {
    return verify(this.password, password);
  }
}
