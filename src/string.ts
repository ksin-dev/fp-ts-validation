import * as SH from './string-helper'
import { createValidate } from './validation';

export const isString = createValidate<string>(SH.isString);
export const minLength = (len: number) => createValidate<string>(SH.minLength(len));
export const maxLength = (len: number) => createValidate<string>(SH.maxLength(len));
export const length = (min: number, max: number) => createValidate<string>(SH.length(min, max));
export const isEmail = createValidate<string>(SH.isEmail);
export const contains = (containS: string) => createValidate<string>(SH.contains(containS));
export const regex = (regex: RegExp) => createValidate<string>(
  s => regex.test(s)
)
