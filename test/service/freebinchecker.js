import FreebincheckerService from '../../src/service/freebinchecker.com'

const {
  formatPaymentSystem,
  DEFAULT_OPTS
} = FreebincheckerService

describe('service/freebinchecker', () => {
  describe('proto', () => {
    const service = new FreebincheckerService()
    const response = {
      valid: true,
      card: {
        status: 'active',
        brand: 'AMEX',
        type: 'credit',
        category: 'STANDARD',
        'sub-category': 'The payment system American Express'
      },
      country: {
        name: 'United States',
        'alpha-2-code': 'US',
        'numeric-code': '840',
        latitude: '37.09024',
        longitude: '-95.712891'
      },
      issuer: {
        name: 'BANESCO BANCO UNIVERSAL S.A.',
        url: 'www.banesco.com',
        tel: '+58 212 501 11 11'
      }
    }

    describe('getPaymentSystem', () => {
      it('returns proper type', done => {
        fetch.mockResponseOnce(JSON.stringify(response))
        service.getPaymentSystem('370247')
          .then(res => {
            expect(res).toBe('AMEX')
            done()
          })
      })

      it('returns null for unknown', done => {
        const data = JSON.stringify({})

        fetch.mockResponseOnce(data)
        service.getPaymentSystem('111111')
          .then(res => {
            expect(res).toBeNull()
            done()
          })
      })
    })

    describe('getCardInfo', () => {
      it('returns proper info', done => {
        fetch.mockResponseOnce(JSON.stringify(response))
        service.getCardInfo('370247')
          .then(res => {
            expect(res).toEqual({
              type: 'credit',
              brand: 'The payment system American Express',
              issuer: {
                country: 'US',
                name: 'BANESCO BANCO UNIVERSAL S.A.',
                phone: '+58 212 501 11 11',
                url: 'www.banesco.com'
              },
              paymentSystem: 'AMEX'
            })
            done()
          })
      })

      it('returns null for unknown', done => {
        const data = JSON.stringify({})

        fetch.mockResponseOnce(data)
        service.getCardInfo('1111111')
          .then(res => {
            expect(res).toBeNull()
            done()
          })
      })
    })
  })

  describe('static', () => {
    it('DEFAULT_OPTS are exposed', () => {
      expect(DEFAULT_OPTS).not.toBeUndefined()
    })

    describe('formatCardInfo', () => {
      it('returns proper value', () => {
        const res = {valid: true, card: {brand: 'VISA'}, country: {}}

        expect(FreebincheckerService.formatCardInfo(res)).toEqual({
          paymentSystem: 'VISA'
        })
      })
    })

    describe('formatPaymentSystem', () => {
      it('returns paySys id from response', () => {
        expect(formatPaymentSystem({valid: true, card: {brand: 'VISA'}, country: {}})).toEqual('VISA')
      })

      it('returns null on invalid response', () => {
        expect(formatPaymentSystem({})).toBeNull()
      })
    })
  })
})
