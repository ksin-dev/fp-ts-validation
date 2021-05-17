import { struct, createValidates, fromValidate, createNullableValidates, fromNullableValidate } from './validation';
import { isString, length } from './string'
import { isNumber, min } from './number'
import { right, left } from 'fp-ts/Either'
interface User {
  name: string,
  age?: number
}

interface Follower {
  user: User,
  follow: User
}
describe('validation', () => {
  const nameValidate = fromValidate(createValidates(
    isString('is not String'),
    length(3, 10)('at least 3 characters, at maximum 10 characters')
  ));
  const ageValidate = fromValidate(
    createValidates(
      isNumber('is not number'),
      min(5)('at least 5')
    )
  )

  const nullableAgeValidate = fromNullableValidate(
    createValidates(
      isNumber('is not number'),
      min(5)('at least 5')
    )
  )
  const validateUser = struct<User>({
    name: nameValidate,
    age: ageValidate
  })
  const validateNullableAgeUser = struct<User>({
    name: nameValidate,
    age: nullableAgeValidate
  })

  it('struct user validation', () => {
    const user: User = {
      name: "abab"
    }
    expect(
      validateUser.validate(user)
    ).toEqual(left('is not number'))

    expect(
      validateNullableAgeUser.validate(user)
    ).toEqual(right(user))
  });

  it('struct of struct', () => {

    const validateFollower = struct<Follower>({
      user: validateUser,
      follow: validateNullableAgeUser
    })

    const follower: Follower = {
      follow: {
        name: "asdb",
      },
      user: {
        name: "sdad",
        age: 10
      }
    }

    const follower2: Follower = {
      follow: {
        name: "fffd",
        age: 3
      },
      user: {
        name: "sdad",
        age: 10
      }
    }

    expect(
      validateFollower.validate(follower)
    ).toEqual(right(follower))

    expect(
      validateFollower.validate(follower2)
    ).toEqual(left('at least 5'))
  })
});
