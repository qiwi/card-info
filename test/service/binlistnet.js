import BinlistnetService from '../../src/service/binlist.net'

const {
  performRequest,
  formatCardInfo,
  formatPaymentSystem,
  DEFAULT_OPTS
} = BinlistnetService

describe('service/binlistnet', () => {
  describe('proto', () => {
    const service = new BinlistnetService()
    const response = {
      number: {},
      scheme: 'visa',
      country: {
        numeric: '840',
        alpha2: 'US',
        name: 'United States of America',
        emoji: '🇺🇸',
        currency: 'USD',
        latitude: 38,
        longitude: -97
      },
      bank: {
        name: 'JPRGAN CHASE BANK, N.A.',
        url: 'www.jpmorganchase.com',
        phone: '416-981-9200'
      }
    }

    describe('getPaymentSystem', () => {
      it('returns proper type', done => {
        fetch.mockResponseOnce(JSON.stringify(response))
        service.getPaymentSystem('4111111')
          .then(res => {
            expect(res).toBe('VISA')
            done()
          })
      })

      it('returns null for unknown', done => {
        const data = JSON.stringify({})

        fetch.mockResponseOnce(data)
        service.getPaymentSystem('4111111')
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
      it('returns value as is', () => {
        const res = {number: {}, scheme: 'visa'}

        expect(formatCardInfo(res)).toEqual(res)
      })
    })

    describe('formatPaymentSystem', () => {
      it('returns paySys id from response', () => {
        expect(formatPaymentSystem({number: {}, scheme: 'visa'})).toEqual('VISA')
      })
    })

    describe('performRequest', () => {
      const request = performRequest.bind(BinlistnetService)

      it('returns formatted response', done => {
        const data = 'foo'
        const formatter = data => data.toUpperCase()
        const opts = {}

        fetch.mockResponseOnce(JSON.stringify(data))
        request(data, opts, formatter)
          .then(res => {
            expect(res).toBe(formatter(data))
            done()
          })
      })

      it('returns null on error (skipError = true)', done => {
        const data = 'foo'
        const formatter = data => data.toUpperCase()
        const opts = {
          skipError: true
        }
        fetch.mockRejectOnce(new Error('failed'))

        request(data, opts, formatter)
          .then(res => {
            expect(res).toBeNull()
            done()
          })
      })

      it('throws exception on error (skipError = false)', done => {
        const data = 'foo'
        const formatter = data => data.toUpperCase()
        const opts = {
          skipError: false
        }
        fetch.mockRejectOnce(new Error('failed'))

        request(data, opts, formatter)
          .catch(err => {
            expect(err.message).toBe('failed')
            done()
          })
      })
    })
  })
})