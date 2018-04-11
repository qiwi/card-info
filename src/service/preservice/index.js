// @flow

import type {
  ICardInfo,
  IService,
  IPaymentSystem,
  IServiceOpts,
  IServiceKeys
} from '../../interface'

import assets from '../../assets'
import AbstractService from '../abstract'
import paymentSystemList from './paymentSystemList'
import binList from './binList'

export {
  paymentSystemList,
  binList
}

export const DEFAULT_OPTS = {}

export default class PreService extends AbstractService implements IService {
  opts: IServiceOpts
  $key: IServiceKeys
  $value: any

  getPaymentSystem(pan: string): Promise<?IPaymentSystem> {
    return new assets.Promise(resolve => {
      const found = paymentSystemList.find(({pan: {prefixPattern}}) => prefixPattern.test(pan))

      resolve(found ? found.key : null)
    })
  }

  getCardInfo(pan: string): Promise<?ICardInfo> {
    return new assets.Promise(resolve => resolve(null))
  }

  static DEFAULT_OPTS: Object = DEFAULT_OPTS
}

