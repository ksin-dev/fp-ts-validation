import { createValidate } from './validation'

export const isBoolean = createValidate(
  (b: boolean) => typeof b === 'boolean'
)