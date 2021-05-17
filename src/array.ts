import { createValidate } from './validation'

export const isArray = createValidate(
  <A>(array: A[]) => Array.isArray(array)
)