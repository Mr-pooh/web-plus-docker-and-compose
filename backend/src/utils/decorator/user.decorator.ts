/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
    (data: never, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

export const AuthUserId = createParamDecorator(
    (data: never, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user.id;
    },
);
