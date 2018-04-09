// @flow

import type {IAny, IServiceKeys, IServiceOpts} from '../interface'

export default class AbstractService {
  opts: IServiceOpts
  $key: IServiceKeys
  $value: any

  constructor (opts: IServiceOpts) {
    if (this.constructor === AbstractService) {
      throw new Error('abstract cannot be instantiated')
    }

    this.opts = this.constructor.resolveOpts(opts)
    return this
  }

  getCardInfo (pan: string) {
    throw new Error('not implemented')
  }

  getPaymentSystem (pan: string) {
    throw new Error('not implemented')
  }

  static resolveOpts (raw: IAny): IServiceOpts {
    return Object.assign({}, this.constructor.DEFAULT_OPTS, raw)
  }
}
