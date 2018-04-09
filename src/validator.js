// @flow

import luhn from 'luhn-alg'

export const LUHN = 'luhn'

export function validateFormat (value: string, pattern: RegExp): boolean {
  return pattern.test(value)
}

export function validateChecksum (value: string, algorithm: string): boolean {
  switch (algorithm) {
    case LUHN:
      return luhn(value)

    case null:
    case undefined:
      return true

    default:
      return false
  }
}
