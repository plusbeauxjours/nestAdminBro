import { SetMetadata, createParamDecorator, applyDecorators, UseGuards, ExecutionContext } from '@nestjs/common';

import { GraphQLResolveInfo } from 'graphql';

import { getManager } from 'typeorm';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator<unknown, ExecutionContext, any>((_data, host) => {
    const [, , ctx] = host.getArgs<any>();
    return ctx.req.user;
});
