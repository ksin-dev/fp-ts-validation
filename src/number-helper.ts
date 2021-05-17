import { Check1, Check2 } from './validation'



export const isNumber: Check1<number> = (v) => typeof v === 'number';
export const min: Check2<number, number> = c => v => v >= c;
export const max: Check2<number, number> = c => v => v <= c;