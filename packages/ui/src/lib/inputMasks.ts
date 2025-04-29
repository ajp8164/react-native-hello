import { Masks as RNMasks, createNumberMask } from 'react-native-mask-input';

const DATE_DAY = (text = '') => {
  let secondCharacterDayMask = /[0]/;
  if (text.charAt(0) === '0') {
    secondCharacterDayMask = /[1-9]/;
  }
  if (text.charAt(0) === '1') {
    secondCharacterDayMask = /[0-9]/;
  }
  if (text.charAt(0) === '2') {
    secondCharacterDayMask = /[0-9]/;
  }
  if (text.charAt(0) === '3') {
    secondCharacterDayMask = /[01]/;
  }
  return [/[0123]/, secondCharacterDayMask];
};

const DATE_MONTH = (text = '') => {
  let secondCharacterMonthMask = /[0]/;
  if (text.charAt(0) === '0') {
    secondCharacterMonthMask = /[1-9]/;
  }
  if (text.charAt(0) === '1') {
    secondCharacterMonthMask = /[012]/;
  }
  return [/[01]/, secondCharacterMonthMask];
};

const DATE_YEAR = (text = '') => {
  let secondCharacterMonthMask = /[1]/;
  if (text.charAt(0) === '1') {
    secondCharacterMonthMask = /[9]/;
  }
  if (text.charAt(0) === '2') {
    secondCharacterMonthMask = /[0]/;
  }
  return [/[12]/, secondCharacterMonthMask, /\d/, /\d/];
};

const USA_STATE = (text = '') => {
  let secondCharacterStateMask = /[A]/;
  if (text.charAt(0) === 'A') {
    secondCharacterStateMask = /[KLRZ]/;
  }
  if (text.charAt(0) === 'C') {
    secondCharacterStateMask = /[AOT]/;
  }
  if (text.charAt(0) === 'D') {
    secondCharacterStateMask = /[CE]/;
  }
  if (text.charAt(0) === 'F') {
    secondCharacterStateMask = /[L]/;
  }
  if (text.charAt(0) === 'G') {
    secondCharacterStateMask = /[A]/;
  }
  if (text.charAt(0) === 'H') {
    secondCharacterStateMask = /[I]/;
  }
  if (text.charAt(0) === 'I') {
    secondCharacterStateMask = /[ADLN]/;
  }
  if (text.charAt(0) === 'K') {
    secondCharacterStateMask = /[SY]/;
  }
  if (text.charAt(0) === 'L') {
    secondCharacterStateMask = /[A]/;
  }
  if (text.charAt(0) === 'M') {
    secondCharacterStateMask = /[ADEINOST]/;
  }
  if (text.charAt(0) === 'N') {
    secondCharacterStateMask = /[CDEHJMVY]/;
  }
  if (text.charAt(0) === 'O') {
    secondCharacterStateMask = /[HKR]/;
  }
  if (text.charAt(0) === 'P') {
    secondCharacterStateMask = /[A]/;
  }
  if (text.charAt(0) === 'R') {
    secondCharacterStateMask = /[I]/;
  }
  if (text.charAt(0) === 'S') {
    secondCharacterStateMask = /[CD]/;
  }
  if (text.charAt(0) === 'T') {
    secondCharacterStateMask = /[NX]/;
  }
  if (text.charAt(0) === 'U') {
    secondCharacterStateMask = /[T]/;
  }
  if (text.charAt(0) === 'V') {
    secondCharacterStateMask = /[AT]/;
  }
  if (text.charAt(0) === 'W') {
    secondCharacterStateMask = /[AIVY]/;
  }
  return [/[ACDFGHIKLMNOPRSTUVW]/, secondCharacterStateMask];
};

export const Masks = {
  DATE_DAY,
  DATE_MONTH,
  DATE_YEAR,
  PIN_CODE: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  SOCIAL_SECURITY_NUMBER: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  USA_CURRENCY: createNumberMask({ delimiter: ',', precision: 0, prefix: ['$'] }),
  USA_POSTAL_CODE: [/\d/, /\d/, /\d/, /\d/, /\d/],
  USA_STATE,
  ...RNMasks,
};
