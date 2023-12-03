/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";


import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

  constructor(
    @InjectRedis() private readonly redis: Redis
  ){
    super({
      secretOrKey:process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }
  async validate(payload: any):Promise<any>{


    console.log("payload",payload)
    const {card_number} = payload;
    // obtenemos las ultimas 4 cifras de la tarjeta
    const last4 = card_number.toString().substr((card_number).toString().length - 4);
    console.log("last4",last4)
    const valid = await this.redis.get(last4);

    console.log("valid",valid)

    if (!valid) {
      // eliminamos los tokens de redis
      // await this.redis.del(token);
      throw new UnauthorizedException('token invalido o expirado');
    }

    return card_number;


  }
}
