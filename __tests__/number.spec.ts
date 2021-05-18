import { isNumber, min, max, range } from '../src/number';
import { fromValidate } from '../src/validation'
import { right, left } from 'fp-ts/Either'

describe("validation: number", () => {
  it("isNumber", () => {
    const _isNumber = fromValidate(isNumber('is not number'))

    expect(
      _isNumber.validate(10)
    ).toEqual(right(10))
  })

  it('min', () => {
    const _min = fromValidate(min(3)('at least 3'));

    expect(
      _min.validate(3)
    ).toEqual(right(3));

    expect(_min.validate(2))
      .toEqual(left('at least 3'))
  })

  it('max', () => {
    const _max = fromValidate(max(3)('at maximum 3'));

    expect(
      _max.validate(3)
    ).toEqual(right(3));

    expect(_max.validate(4))
      .toEqual(left('at maximum 3'))
  })

  it('range', () => {
    const _range = fromValidate(range(3, 5)('fail'));

    expect(
      _range.validate(4)
    ).toEqual(right(4))

    expect(
      _range.validate(6)
    ).toEqual(left('fail'))
  })
})