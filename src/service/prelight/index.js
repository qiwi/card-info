// @flow

import type {ICardInfo, IService, IPaymentSystem, IServiceOpts, IAny} from '../../interface'
import paymentSystemList from './paymentSystemList'
import binList from './binList'

import Promise from '../../assets/promise'

export {
  paymentSystemList,
  binList
}

export const DEFAULT_OPTS = {}

export default class PrelightService implements IService {
  opts: IServiceOpts
  constructor(opts: IAny): IService {
    this.opts = this.constructor.resolveOpts(opts)
    return this
  }

  getPaymentSystem(pan: string): Promise<?IPaymentSystem> {
    return new Promise(resolve => {
      const found = paymentSystemList.find(({prefixPattern}) => prefixPattern.test(pan))

      resolve(found ? found.key : null)
    })
  }

  getCardInfo(pan: string): Promise<?ICardInfo> {
    return new Promise(resolve => resolve(null))
  }

  static resolveOpts(raw: IAny): IServiceOpts {
    return Object.assign({}, DEFAULT_OPTS, raw)
  }
}

