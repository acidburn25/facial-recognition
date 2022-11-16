import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../config/config.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtApiStrategy extends PassportStrategy(Strategy, 'ApiStrategy') {
    private _secretOrKeyProvider: (_request: any, _rawJwtToken: any, done: (arg0: null, arg1: string) => void) => void;
    token: any;
    constructor(private readonly configService: ConfigService, private jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'rindegastos',
        });

        configService.getServerKeyApiWebApp().then((token) => {
            this._secretOrKeyProvider = (_request: any, _rawJwtToken: any, done: (arg0: null, arg1: string) => void) => {
                done(null, token);
                this.token = _rawJwtToken;
            };
        });
    }

    /**
     * @description Método que valida el payload y el token de autorización
     * @param {JwtPayload} payload
     * @returns {Promise<any>}
     * @memberof JwtFalabellaStrategy
     */
    async validate(payload: JwtPayload): Promise<any> {
        const { user_id, company_id } = payload;
        if (user_id === undefined && company_id === undefined) {
            throw new UnauthorizedException('Invalid Username');
        }
        // if (userId !== this.configService.get('USERNAME_FALABELLA')) {
        //     throw new UnauthorizedException('Invalid Credentials');
        // }
        const user = { user_id, company_id };
        return user;
    }
}
