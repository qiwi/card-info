import {AbstractService, BinlistnetService, PreService} from '../../src/service'

describe('service/index', () => {
  it('exports inner classes', () => {
    expect(AbstractService).toEqual(expect.any(Function))
    expect(BinlistnetService).toEqual(expect.any(Function))
    expect(PreService).toEqual(expect.any(Function))
  })
})
