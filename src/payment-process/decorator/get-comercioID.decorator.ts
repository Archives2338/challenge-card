/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
// recibiremos en las cabeceras el 'X-Comercio-ID' y lo validaremos

import { BadRequestException, createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const getComercioID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // recibimos el comercioID
    const comercioID = request.headers['x-comercio-id'];
    // validamos que exista
    if (!comercioID) {
      throw new BadRequestException('Comercio ID is required');
    }
    // retornamos el comercioID
    return comercioID;
  },
);
