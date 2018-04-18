import {BraintreeService} from '../../src/service'

describe('service/braintree', () => {
  const service = new BraintreeService()

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
        service.getPaymentSystem('54321')
          .then(key => {
            expect(key).toEqual('MASTER-CARD')
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
    describe('creditCardType', () => {
      it('allows to add custom card', done => {
        BraintreeService.creditCardType.addCard({
          niceType: 'Foo',
          type: 'foo',
          prefixPattern: /^(12345)$/,
          exactPattern: /^(12345)\d*$/,
          gaps: [4, 8, 12],
          lengths: [16],
          code: {
            name: 'CVV',
            size: 3
          }
        })

        service.getPaymentSystem('1234567890123456')
          .then(key => {
            expect(key).toEqual('FOO')
            done()
          })
          .catch()
      })
    })
  })
})
