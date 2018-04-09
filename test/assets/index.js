import assets from '../../src/assets'

describe('assets/index', () => {
  it('exposes Promise', () => {
    expect(assets.Promise).not.toBeUndefined()
  })

  it('exposes transport', () => {
    expect(assets.transport).not.toBeUndefined()
  })
})
