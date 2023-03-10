import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../config/config.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private _secretOrKeyProvider: (_request: any, _rawJwtToken: any, done: (arg0: null, arg1: string) => void) => void;
    private logger = new Logger('JwtStrategy', { timestamp: true });
    constructor(private readonly configService: ConfigService, private jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'rindegastos',
        });
        configService.getServerKey().then((token) => {
            this._secretOrKeyProvider = (_request: any, _rawJwtToken: any, done: (arg0: null, arg1: string) => void) => {
                done(null, token);
            };
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const { username, userId, ms, oldToken, message } = payload;

        if (!userId || !username) {
            this.logger.error(`Invalid JWT payload: ${JSON.stringify(payload)}`);
            throw new UnauthorizedException('No estas autorizado');
        }

        const dataToSign = {
            username,
            userId,
            ms,
            message,
            oldToken,
        };

        let token = this.jwtService.sign(dataToSign);
        token = `Bearer ${token}`;

        return token;
    }
}
