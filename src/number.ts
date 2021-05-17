import { createValidate, createValidates } from './validation'
import * as NH from './number-helper'


export const isNumber = createValidate<number>(NH.isNumber);
export const min = (value: number) => createValidate<number>(NH.min(value));
export const max = (value: number) => createValidate<number>(NH.max(value));
export const range = (least: number, maximum: number) => (message: string) =>
  createValidates(
    min(least)(message),
    max(maximum)(message)
  )