import AbstractService from '../../src/service/abstract'

class CustomService extends AbstractService {}

const {
  normalizePaymentSystem,
  parseResponse,
  performRequest
} = AbstractService

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

    describe('parseResponse', () => {
      it('evaluates .json() if found', () => {
        const res = {
          json () {
            return 'foo'
          }
        }

        expect(parseResponse(res)).toBe('foo')
      })

      it('returns res as is otherwise', () => {
        const res = {
          foo: 'bar'
        }

        expect(parseResponse(res)).toBe(res)
      })
    })

    describe('performRequest', () => {
      const request = performRequest.bind(AbstractService)

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
