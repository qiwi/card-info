import AbstractService from '../../src/service/abstract'

class CustomService extends AbstractService {}

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
})
