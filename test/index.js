import cardInfo, {composer} from '../src'
import assets from '../src/assets'

describe('index', () => {
  it('exposes composer', () => {
    expect(composer).not.toBeUndefined()
  })

  describe('configurable', () => {
    const {Promise, transport} = cardInfo

    afterAll(() => {
      cardInfo.Promise = Promise
      cardInfo.transport = transport
    })

    it('Promise', () => {
      const Promise = {}
      cardInfo.Promise = Promise
      expect(assets.Promise).toBe(Promise)
    })

    it('transport', () => {
      const transport = {}
      cardInfo.transport = transport
      expect(assets.transport).toBe(transport)
    })
  })
})

