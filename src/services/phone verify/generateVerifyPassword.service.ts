import { randomInt } from 'crypto';

export const generateVerifyPassword = (): string => {
  let result: string = '';
  for (let i = 0; i < 4; i++) {
    result += randomInt(0, 9).toString();
  }

  return result;
};
