import AbstractService from '../../src/service/abstract'

class CustomService extends AbstractService {}

const {normalizePaymentSystem} = AbstractService

describe('service/abstract', () => {
  it('breaks instantiation', () => {
    expect(() => new AbstractService()).toThrow('abstract cannot be instantiated')
  })

  describe('proto', () => {
    const service = new CustomService({})
    const cases = ['getPaymentSystem', 'getCardInfo']

    cases.forEach(method => {
      it(method + ' always throws an error', () => {
        expect(() => service[method]('foo')).toThrow('not implemented')
      })
    })
  })

  describe('static', () => {
    describe('normalizePaymentSystem', () => {
      it('formats string value to uppercase', () => {
        expect(normalizePaymentSystem('foo')).toEqual('FOO')
      })

      it('returns null otherwise', () => {
        expect(normalizePaymentSystem(123)).toBeNull()
        expect(normalizePaymentSystem()).toBeNull()
        expect(normalizePaymentSystem()).toBeNull()
      })
    })

    describe('resolveOpts', () => {
      it('mixes defaults and custom values', () => {
        const foo = {bar: 'baz'}

        expect(AbstractService.resolveOpts(foo)).toEqual(foo)
      })
    })
  })
})
