import Service, {paymentSystemList, binList} from '../../src/service/prelight'

const {getPaymentSystem, getCardInfo} = new Service()

describe('prelight', () => {
  it('exposes payment systems list', () => {
    expect(paymentSystemList).toEqual(expect.any(Array))
  })

  it('exposes bin list', () => {
    expect(binList).toEqual(expect.any(Array))
  })

  describe('getPaymentSystem', () => {
    it('resolves pay sys id by pan', done => {
      getPaymentSystem('4111111111111111')
        .then(key => {
          expect(key).toEqual('VISA')
          done()
        })
        .catch()
    })

    it('promises null otherwise', done => {
      getPaymentSystem('0101010101010101010101')
        .then(key => {
          expect(key).toBeNull()
          done()
        })
        .catch()
    })
  })

  describe('getCardInfo', () => {
    it('returns null otherwise', done => {
      getCardInfo('0101010101010101010101')
        .then(key => {
          expect(key).toBeNull()
          done()
        })
        .catch()
    })
  })
})
