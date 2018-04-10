// @flow

import type {ICardInfo, IService, IPaymentSystem, IServiceOpts, IServiceKeys} from '../../interface'
import AbstractService from '../abstract'
import paymentSystemList from './paymentSystemList'
import binList from './binList'

import Promise from '../../assets/promise'

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
    return new Promise(resolve => {
      const found = paymentSystemList.find(({prefixPattern}) => prefixPattern.test(pan))

      resolve(found ? found.key : null)
    })
  }

  getCardInfo(pan: string): Promise<?ICardInfo> {
    return new Promise(resolve => resolve(null))
  }

  static DEFAULT_OPTS: Object = DEFAULT_OPTS
}

