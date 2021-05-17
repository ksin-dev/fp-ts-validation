import { Check2, Check1 } from './validation'
import { size } from 'fp-ts/string'

export const minLength: Check2<number, string> = len => s => len <= size(s);
export const maxLength: Check2<number, string> = len => s => len >= size(s);
export const isString: Check1<unknown> = s => typeof s === "string";
export const isEmail: Check1<string> = s => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(s.toLowerCase());
}

export const length = (min:number, max:number) => (s:string) => minLength(min)(s) && maxLength(max)(s);
export const contains: Check2<string, string> = containS => s => s.includes(containS);
