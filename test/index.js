import {getPaymentSystem} from '../src'

describe('index', () => {
  describe('getPaymentSystem', () => {
    it('properly resolves types by PAN', () => {
      const cases = [['foo', null]]

      cases.forEach(([value, result]) => expect(getPaymentSystem(value)).toEqual(result))
    })
  })
})

