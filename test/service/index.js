import {AbstractService, BinlistnetService, BraintreeService, PreService} from '../../src/service'

describe('service/index', () => {
  it('exports inner classes', () => {
    const exposed = [AbstractService, BinlistnetService, BraintreeService, PreService]

    exposed.forEach(constructor => expect(constructor).toEqual(expect.any(Function)))
  })
})
