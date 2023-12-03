/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GenerateTokenDto } from '../../dto/generate.token.dto'
import { getComercioID } from '../../decorator/get-comercioID.decorator';
import { PaymentProcessService } from '../../services/payment-process/payment-process.service';

@Controller('payment-process')
export class PaymentProcessController {

  constructor(private paymentProcessService: PaymentProcessService) {}

  @Post('v2/token')
  create(@Body() request: GenerateTokenDto) {
    return this.paymentProcessService.generateTokenService(request);
  }

  @Get('v2/charge')
  // ACA VALIDAMOS EL TOKEN Y SU DURACION DE 15 MINUTOS SINO EXPIRA
  @UseGuards(AuthGuard('jwt'))

  charge(@getComercioID() comercioID:any  ) {
    return this.paymentProcessService.chargeService(comercioID);
  }


}
