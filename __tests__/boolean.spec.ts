import { createValidates, fromValidate } from '../src/validation'
import { isBoolean } from '../src/boolean'
import { left, right } from 'fp-ts/lib/Either';

describe('boolean', () => {
  it('isBoolean', () => {
    const value = true;

    const validation = fromValidate(
      createValidates(
        isBoolean('is not boolean')
      )
    );

    expect(
      validation.validate(value)
    ).toEqual(
      right(value)
    )

    let v: boolean;
    expect(
      validation.validate(v)
    ).toEqual(
      left('is not boolean')
    )
  })
})