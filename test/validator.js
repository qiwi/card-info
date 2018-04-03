import {validateFormat, validateChecksum, LUHN} from '../src/validator'

describe('validateFormat', () => {
  it('returns true if value matches target pattern', () => {
    expect(validateFormat('foo', /foo/)).toBeTruthy()
  })

  it('returns false otherwise', () => {
    expect(validateFormat('foo', /bar/)).toBeFalsy()
  })
})

describe('validateChecksum', () => {
  it('supports luhn algorithm', () => {
    expect(validateChecksum('4111111111111111', LUHN)).toBeTruthy()
    expect(validateChecksum('4111111111111112', LUHN)).toBeFalsy()
  })

  it('returns true by default', () => {
    expect(validateChecksum('4111111111111112')).toBeTruthy()
    expect(validateChecksum('4111111111111112', 'FOO')).toBeTruthy()
  })
})
