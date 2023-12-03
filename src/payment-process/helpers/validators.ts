/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
// crearemos las validaciones para el modelo Card

import { checkLuhn } from "./luhn";
import { GenerateTokenDto } from '../dto/generate.token.dto';


export const validateCard = (card: GenerateTokenDto) => {


  let validCard: boolean = true;
  // arreglo de errores
  let errors: string[] = [];



  // Validaciones especificas



  // si no tiene de 13 a 16 digitos pusheamos el error en el arreglo
  if ((card.card_number).toString().length < 13 || (card.card_number).toString().length > 16) {
    errors.push("El numero de tarjeta debe tener entre 13 y 16 digitos");
    validCard = false;
  }

  if (checkLuhn((card.card_number).toString()) !== 0) {
    errors.push("No es una tarjeta valida");
    validCard = false;
  }
  if ((card.cvv).toString().length < 3 || (card.cvv).toString().length > 4) {
    errors.push("El cvv debe ser de 3 o 4 digitos");
    validCard = false;
  }

  if (parseInt(card.expiration_month) < 1 || parseInt(card.expiration_month) > 12) {
    errors.push("El mes de expiracion debe ser del 1 al 12");
    validCard = false;
  }
  let currentYear = new Date().getFullYear();
  let expirationYear = parseInt(card.expiration_year);

  if (expirationYear < currentYear || expirationYear > currentYear + 5) {
    errors.push("El año debe ser mayor al actual y no mayor a 5 años posteriores");
    validCard = false;
  }

  // si no tiene 4 digitos pusheamos el error en el añ
  if (card.expiration_year.length !== 4) {
    errors.push("El año debe tener 4 digitos");
    validCard = false;
  }

  // validamos si el email es valido
  let emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(card.email)) {
    errors.push("El email no es valido");
    validCard = false;
  }
  // validamos si es gmail.com hotmail.com y yahoo.com

  let emailDomain = card.email.split('@')[1];
  if (emailDomain !== 'gmail.com' && emailDomain !== 'hotmail.com' && emailDomain !== 'yahoo.com') {
    errors.push("El email debe ser de gmail.com, hotmail.com o yahoo.com");
    validCard = false;
  }


  return {
    valid: validCard,
    errorsDetected: errors
  };
}
