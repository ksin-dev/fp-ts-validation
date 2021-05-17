import { left, right } from 'fp-ts/lib/Either'
import { minLength, maxLength, isString, contains,length } from './string'
import {  createValidates,fromValidate } from './Validation'



describe("validation: string", () => {
  it("isString: '1' is right", () => {
    expect(
      isString('is not String')("1")
    ).toEqual(right('1'))
  })


  it("minLength: abcd >= 10 is left", () => {
    expect(
      minLength(10)('at least 10 characters')("abcd")
    ).toEqual(left('at least 10 characters'))
  })

  it("maxLength: abcd <= 10 is right", () => {
    expect(
      maxLength(10)('at maximum 10 characters')
        ("abcd")
    ).toEqual(right("abcd"))
  })

  it("contains: 'abcd' contains 'abc'", () => {
    expect(
      contains("abc")("is not contains")("abcd")
    ).toEqual(
      right("abcd")
    )
  })

  it("contains: 'abcd' is not contains 'bbb'", () => {
    expect(
      contains("bbb")("is not contains")("abcd")
    ).toEqual(
      left('is not contains')
    )
  })

  it("'abcd' least 3 and maximum 10 and isString", () => {
    const s = "abcd";

    const validateString = fromValidate(
      createValidates(
        isString('is not String'),
        length(3,10)('at least 3 characters, at maximum 10 characters')
      )
    )
    
    expect(
      validateString.validate(s)
    ).toEqual(right('abcd'))
  })
})