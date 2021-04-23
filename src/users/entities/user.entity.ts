import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './../repositories/users.repository';
import { UserMetadata } from './user_metadata.entity';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { AfterInsert, Column, Entity, getRepository, OneToMany, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/common/entities/core.entity';
import { UserMetadataRepository } from '../repositories/user_metadata.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
// import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
// import { Order } from 'src/orders/entities/order.entity';
// import { Payment } from 'src/payments/entities/payment.entity';

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  // private readonly userMetadataRepository: UserMetadataRepository;
  private readonly userMetadataRepository: Repository<UserMetadata>;
  private readonly userRepository: UserRepository;

  @Column({ unique: true })
  @Field(type => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field(type => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(type => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field(type => Boolean)
  @IsBoolean()
  verified: boolean;

  // @Field(type => [Restaurant])
  // @OneToMany(
  //   type => Restaurant,
  //   restaurant => restaurant.owner,
  // )
  // restaurants: Restaurant[];

  // @Field(type => [Order])
  // @OneToMany(
  //   type => Order,
  //   order => order.customer,
  // )
  // orders: Order[];

  // @Field(type => [Payment])
  // @OneToMany(
  //   type => Payment,
  //   payment => payment.user,
  //   { eager: true },
  // )
  // payments: Payment[];

  // @Field(type => [Order])
  // @OneToMany(
  //   type => Order,
  //   order => order.driver,
  // )
  // rides: Order[];

  @AfterInsert()
  async afterInsert(): Promise<void>{
    const temp = getRepository(UserMetadata).create(
      {id: this.id,
        userId:this.id,
        firstName:"firstName",
        lastName:"lastName",
        email:"email",
        country:"country",
        postalCode:"postalCode",
        address:"address",}
    );
    getRepository(UserMetadata).save(temp)
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
