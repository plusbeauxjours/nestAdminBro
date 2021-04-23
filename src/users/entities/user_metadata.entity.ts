import { BaseEntity, Entity, Column, DeepPartial, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class UserMetadata extends BaseEntity  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('bigint', { name: 'user_id', nullable: false })
    userId: number;

    @Column('text', { name: 'first_name', nullable: false })
    firstName: string;

    @Column('text', { name: 'last_name', nullable: false })
    lastName: string;

    @Column('text', { name: 'phone', nullable: true })
    phone?: string;

    @Column('text', { name: 'signup_id', nullable: true })
    signupID?: string;

    @Column('text', { name: 'email', nullable: false })
    email: string;

    @Column('text', { name: 'country', nullable: false })
    country: string;

    @Column('text', { name: 'postal_code', nullable: false })
    postalCode: string;

    @Column('text', { name: 'address', nullable: false })
    address: string;

    @Column('text', { name: 'unit_no', nullable: true })
    unitNo?: string;

    @Column('text', { name: 'state_province', nullable: true })
    stateProvince?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

   
}
