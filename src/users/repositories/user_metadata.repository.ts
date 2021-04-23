import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/common/common.repository';
import { UserMetadata } from '../entities/user_metadata.entity';

@EntityRepository(UserMetadata)
export class UserMetadataRepository extends CommonRepository<UserMetadata> {}
