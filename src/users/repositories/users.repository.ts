import { EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CommonRepository } from 'src/common/common.repository';

@EntityRepository(User)
export class UserRepository extends CommonRepository<User> {}
