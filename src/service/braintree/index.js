// @flow

import creditCardType from 'credit-card-type'
import AbstractService from '../abstract'
import type {
  IPaymentSystem,
  IService,
  IServiceKeys,
  IServiceOpts,
  ICardInfo
} from '../../interface'
import assets from '../../assets'

export const DEFAULT_OPTS = {}

export default class BraintreeService extends AbstractService implements IService {
  opts: IServiceOpts
  $key: IServiceKeys
  $value: any

  getPaymentSystem(pan: string): Promise<?IPaymentSystem> {
    return new assets.Promise(resolve => {
      const found = this.constructor.creditCardType(pan)
      const res = found.length === 1
        ? AbstractService.normalizePaymentSystem(found[0].type)
        : null

      resolve(res)
    })
  }

  getCardInfo(pan: string): Promise<?ICardInfo> {
    return new assets.Promise(resolve => resolve(null))
  }

  static DEFAULT_OPTS: Object = DEFAULT_OPTS

  static creditCardType = creditCardType
}
