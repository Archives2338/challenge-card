/* eslint-disable prettier/prettier */
'use strict';


function checkLuhn(strToTest: string, multiple: number = 10): number {
  let digit: number = 0;
  let sum: number = 0;
  const length: number = strToTest.length;
  let odd: boolean = false;

  for (let i: number = length - 1; i >= 0; i--) {
    digit = parseInt(strToTest[i], 10) | 0;

    if (odd === true) {
      digit = (digit * 2) | 0;
    }
    if (digit > 9) {
      digit = digit - 9;
    }
    odd = !odd;
    sum += digit;
  }
  const res: number = sum % multiple;
  if (res === 0) {
    return 0;
  }
  return multiple - res;
}

export { checkLuhn };
