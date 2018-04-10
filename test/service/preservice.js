import Service, {paymentSystemList, binList} from '../../src/service/preservice'

const service = new Service()

describe('service/preservice', () => {
  it('exposes payment systems list', () => {
    expect(paymentSystemList).toEqual(expect.any(Array))
  })

  it('exposes bin list', () => {
    expect(binList).toEqual(expect.any(Array))
  })

  describe('proto', () => {
    describe('getPaymentSystem', () => {
      it('resolves pay sys id by pan', done => {
        service.getPaymentSystem('4111111111111111')
          .then(key => {
            expect(key).toEqual('VISA')
            done()
          })
          .catch()
      })

      it('promises null otherwise', done => {
        service.getPaymentSystem('0101010101010101010101')
          .then(key => {
            expect(key).toBeNull()
            done()
          })
          .catch()
      })
    })

    describe('getCardInfo', () => {
      it('returns null otherwise', done => {
        service.getCardInfo('0101010101010101010101')
          .then(key => {
            expect(key).toBeNull()
            done()
          })
          .catch()
      })
    })
  })

  describe('static', () => {
    it('resolveOpts', () => {
      const CustomPromise = () => {}
      const opts = Service.resolveOpts({Promise: CustomPromise})

      expect(opts.Promise).toBe(CustomPromise)
    })
  })
})
