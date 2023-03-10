import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthInterface } from '../auth/auth.interface';

export const GetAuthData = createParamDecorator((_data, ctx: ExecutionContext): AuthInterface => {
    const req = ctx.switchToHttp().getRequest();

    const authData = {
        user: req.user,
        token: req.headers.authorization,
        ip: req.ip,
        url: req.url,
    };

    return authData;
});
