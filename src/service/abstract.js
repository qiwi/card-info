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
    return Object.assign({}, this.DEFAULT_OPTS, raw)
  }

  static normalizePaymentSystem (value: string): string | null {
    return typeof value === 'string'
      ? value.toUpperCase()
      : null
  }

  static DEFAULT_OPTS: Object = {}
}
