/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { validateCard } from '../../helpers/validators';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenDto } from '../../dto/generate.token.dto'
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comercio } from '../../entities/comercio.entity';
@Injectable()
export class PaymentProcessService {
constructor(private readonly jwtoken: JwtService, @InjectRedis() private readonly redis: Redis,
@InjectRepository(Comercio) private readonly comercioRepository: Repository<Comercio>
){}




async generateTokenService(data: GenerateTokenDto){
// usamos el validator
const card = validateCard(data);
if (card.valid){
  // generamos el token
  const token = await this.jwtoken.sign({
    card_number: data.card_number,
    expiration_month: data.expiration_month,
    expiration_year: data.expiration_year,
    cvv: data.cvv,
    email: data.email,
  });

  // lo guardamos en MEMORIA redis las ultimas 4 cifras de la tarjeta int

  const last4 = (data.card_number).toString().substr((data.card_number).toString().length - 4);


  await this.redis.set(last4, JSON.stringify({
    card: last4,
  }));

  console.log("token",token)

  return {
    token: token,
  };
}else{
  throw new BadRequestException({
    message: card.errorsDetected,
  });
}
}
async chargeService(comercioID: any){
// buscamos el comercio
console.log("comercioID",comercioID)
const comercio = await this.comercioRepository.findOne({
  where: {
    idComercio: comercioID,
  },
});

if (!comercio){
  throw new BadRequestException('Comercio not found');
}

return {
  comercio: comercio,
  succes  : true,
}

}

}
