/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ComercialID {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}
