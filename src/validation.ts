import {
  left, right, Either, isLeft, mapLeft, map
} from 'fp-ts/Either';
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
export type Check1<A> = (a: A) => boolean;
export type Check2<A, B> = (a: A) => (b: B) => boolean

export type Validate1<A> = (value: A) => Either<string, A>;
export type Validate2 = <A> (check: Check1<A>) => (message: string) => Validate1<A>;
export type Validates = <A> (...checks: Validate1<A>[]) => (value: A) => Either<string, A>;

export const createValidate: Validate2 =
  (check) =>
    (message) =>
      (value) =>
        check(value) ? right(value) : left(message);

export const createValidates = <A>(...checks: Validate1<A>[]) =>
  (value: A) => {
    return pipe(
      checks,
      A.reduce(right<string, A>(value), (either, check) => isLeft(either) ? either : check(value))
    )
  }

export const createNullableValidates = <A>(...checks: Validate1<A>[]) =>
  (value?: A) => {
    return !value ? right(value) : createValidates(...checks)(value);
  }

export interface Validation<A> {
  readonly validate: (a: A) => Either<string, A>;
}

export declare const URI = 'Validation'
/**
 * @category instances
 * @since 2.0.0
 */
export declare type URI = typeof URI
declare module 'fp-ts/HKT' {
  interface URItoKind1<A> {
    readonly [URI]: Validation<A>
  }
}

export const fromValidate = <A>(validate: (a: A) => Either<string, A>): Validation<A> => {
  return {
    validate: createValidates(validate) as Validate1<A>
  };
}

export const fromNullableValidate = <A>(validate: (a: A) => Either<string, A>): Validation<A> => {
  return {
    validate: createNullableValidates(validate) as Validate1<A>
  };
}

export const struct =
  <A extends object>(obs: { [K in keyof A]: Validation<A[K]> }) => {
    return fromValidate((first: A) => {
      return pipe(
        Object.keys(obs) as [keyof A],
        A.reduce(right<string, A>(first), (a, key) => {
          return isLeft(a)
            ? a
            : obs[key].validate(first[key]) as any
        }),
        map(() => first)
      ) as Either<string, A>
    })
  }



// export const of = (validation) => {

// }