import composer from '../src/composer'

describe('composer', () => {
  it('produces chained services', () => {
    const s1 = {}
    const s2 = {}
    const composed = composer(s1, s2)

    expect(composed.services).toEqual([s1, s2])
    expect(composed.getCardInfo).toEqual(expect.any(Function))
    expect(composed.getPaymentSystem).toEqual(expect.any(Function))
  })

  describe('composed', () => {
    const foo = {
      getPaymentSystem() {
        return new Promise(resolve => resolve('foo'));
      }
    }
    const bar = {
      getPaymentSystem() {
        return new Promise(resolve => resolve(null))
      }
    }

    it('returns the first `significant` value from promise', done => {
      const composed = composer(foo, bar)

      composed.getPaymentSystem().then(res => {
        expect(res).toEqual('foo')
        done()
      })
    })

    it('proceeds to next service if the prev returns null', done => {
      const composed = composer(bar, bar, foo)

      composed.getPaymentSystem().then(res => {
        expect(res).toEqual('foo')
        done()
      })
    })

    it('returns null if there\'s no next service', done => {
      const composed = composer(bar, bar)

      composed.getPaymentSystem().then(res => {
        expect(res).toBeNull()
        done()
      })
    })
  })
})