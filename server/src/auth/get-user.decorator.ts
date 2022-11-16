import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthInterface } from './auth.interface';

export const GetAuthData = createParamDecorator(
    (_data, ctx: ExecutionContext): AuthInterface => {
        const req = ctx.switchToHttp().getRequest();

        const authData = {
            userData: req.user,
            //companyId: req.company_id,
            token: req.headers.authorization,
            ip: req.ip,
            url: req.url,
        };

        return authData;
    },
);
