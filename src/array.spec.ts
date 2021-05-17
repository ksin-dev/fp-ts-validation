import { createValidates, fromValidate } from './validation'
import { isArray } from './array'
import { left, right } from 'fp-ts/lib/Either';

describe('array', () => {
  it('is array', () => {
    const value = ['a', 'b'];

    const validation = fromValidate(
      createValidates(
        isArray('is not array')
      )
    );

    expect(
      validation.validate(value)
    ).toEqual(
      right(value)
    )

    let v: number[];
    expect(
      validation.validate(v)
    ).toEqual(
      left('is not array')
    )
  })
})