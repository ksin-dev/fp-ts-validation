import { left, right } from 'fp-ts/lib/Either'
import { minLength, maxLength, isString, contains, length, regex } from './string'
import { createValidates, fromValidate } from './Validation'



describe("validation: string", () => {
  it("isString", () => {
    expect(
      isString('is not String')("1")
    ).toEqual(right('1'))
  })


  it("minLength", () => {
    expect(
      minLength(10)('at least 10 characters')("abcd")
    ).toEqual(left('at least 10 characters'))
  })

  it("maxLength", () => {
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

    expect(
      contains("bbb")("is not contains")("abcd")
    ).toEqual(
      left('is not contains')
    )
  })

  it("length", () => {
    const s = "abcd";

    const validateString = fromValidate(
      createValidates(
        isString('is not String'),
        length(3, 10)('at least 3 characters, at maximum 10 characters')
      )
    )

    expect(
      validateString.validate(s)
    ).toEqual(right('abcd'))
  })

  it('regex', () => {
    const s = '123dfb';

    const validation = fromValidate(
      createValidates(
        regex(/^((?![|\\?*<":>/]).){1,}$/)('fail')
      )
    )
    expect(
      validation.validate(s)
    ).toEqual(
      right(s)
    )

    expect(
      validation.validate("asd?")
    ).toEqual(
      left('fail')
    )
  })
})