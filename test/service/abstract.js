import AbstractService, {AbstractRemoteService} from '../../src/service/abstract'

class CustomService extends AbstractService {}

const {
  normalizePaymentSystem,
  parseResponse,
  performRequest,
  promiseNull,
  normalizePan,
  DEFAULT_OPTS
} = AbstractService

describe('service/abstract', () => {
  it('breaks instantiation', () => {
    expect(() => new AbstractService()).toThrow('abstract cannot be instantiated')
  })

  describe('proto', () => {
    const service = new CustomService({})
    const cases = ['getPaymentSystem', 'getCardInfo']

    cases.forEach(method => {
      it(method + ' returns Promise<null>', done => {
        service[method]('foo')
          .then(res => {
            expect(res).toBeNull()
            done()
          })
          .catch()
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

        expect(AbstractService.resolveOpts(foo)).toEqual({...foo, ...DEFAULT_OPTS})
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

      it('properly passes service transport opts to api', done => {
        const url = 'https://example.com'
        const headers = {foo: 'bar'}
        const DEFAULT_OPTS = {
          url,
          headers,
          qux: 'quux'
        }
        class Service extends AbstractService {
          static DEFAULT_OPTS = DEFAULT_OPTS
        }
        const pan = '12345'
        const opts = {transport: {foo: 'bar'}}
        const service = new Service(opts)
        const formatter = res => res

        fetch.once(JSON.stringify(pan))

        Service.performRequest(pan, service.opts, formatter)
          .then(() => {
            expect(fetch).toHaveBeenCalledWith('https://example.com/12345',
              {
                foo: 'bar',
                headers: {foo: 'bar'},
                url: 'https://example.com/12345'
              })
            done()
          })
      })
    })

    describe('promiseNull', () => {
      it('returns Promise<null>', done => {
        promiseNull()
          .then(res => {
            expect(res).toBeNull()
            done()
          })
          .catch()
      })
    })

    describe('normalizePan', () => {
      it('replaces any non-numeric symbols from input string', () => {
        expect(normalizePan('foo12bar3')).toBe('123')
      })

      it('converts falsy types to empty string', () => {
        expect(normalizePan(false)).toBe('')
        expect(normalizePan(null)).toBe('')
      })
    })

    describe('normalizeBin', () => {
      it('replaces any non-numeric symbols', () => {
        expect(AbstractService.normalizeBin('foo12bar3')).toBe('123')
      })
      it('trims bin to required length', () => {
        expect(AbstractService.normalizeBin('1234567890')).toBe('123456')
      })
    })
  })

  describe('AbstractRemoteService', () => {
    describe('static', () => {
      describe('formatPaymentSystem', () => {
        it('returns value as is', () => {
          expect(AbstractRemoteService.formatPaymentSystem('foo')).toBe('foo')
        })
      })

      describe('formatCardInfo', () => {
        it('returns value as is', () => {
          expect(AbstractRemoteService.formatCardInfo('foo')).toBe('foo')
        })
      })
    })
  })
})
