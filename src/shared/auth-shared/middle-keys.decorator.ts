import { SetMetadata } from '@nestjs/common';

export const MIDDLE_KEYS = 'middle keys';

export const Keys = (...keys: string[]) =>
  SetMetadata(MIDDLE_KEYS, [...keys, 'iat']);
