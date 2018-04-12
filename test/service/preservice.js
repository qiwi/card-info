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
      it('resolves paysys by prefix', done => {
        service.getPaymentSystem('4')
          .then(key => {
            expect(key).toEqual('VISA')
            done()
          })
          .catch()
      })

      it('resolves paysys by full pattern', done => {
        service.getPaymentSystem('22049')
          .then(key => {
            expect(key).toEqual('MIR')
            done()
          })
          .catch()
      })

      it('returns null if found more than one match', done => {
        service.getPaymentSystem('2')
          .then(key => {
            expect(key).toBeNull()
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
      it('always returns Promise<null>', done => {
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
