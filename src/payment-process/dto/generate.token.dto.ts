/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class GenerateTokenDto {
  // validaciones generales
  @IsNotEmpty()
  @IsNumber()
  readonly card_number: number;


  @IsNotEmpty()
  @IsString()


  readonly expiration_month: string;

  @IsNotEmpty()
  @IsString()
  readonly expiration_year: string;

  @IsNotEmpty()
  @IsNumber()
  readonly cvv: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}

