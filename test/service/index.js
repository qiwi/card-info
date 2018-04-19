import * as services from '../../src/service'

describe('service/index', () => {
  it('exports inner classes', () => {
    Object.values(services).forEach(constructor => expect(constructor).toEqual(expect.any(Function)))
  })
})
