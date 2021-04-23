import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminModule } from '@admin-bro/nestjs';
import { Database, Resource } from '@admin-bro/typeorm';
import AdminBro from 'admin-bro';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UserMetadata } from './users/entities/user_metadata.entity';

AdminBro.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminModule.createAdmin({
      adminBroOptions:{
        rootPath: '/admin',
        resources:[User, UserMetadata]
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'minjaelee',
      password: 'password',
      database: 'nestAdmin',
      entities: [User, UserMetadata],
      synchronize: true,
    }),
    User,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
