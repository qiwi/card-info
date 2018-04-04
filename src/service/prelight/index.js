// @flow

import type {ICardInfo, IService, IPaymentSystem, IServiceOpts} from '../../interface'
import paymentSystemList from './paymentSystemList'
import binList from './binList'

export {
  paymentSystemList,
  binList
}

export default class PrelightService implements IService {
  constructor(opts: IServiceOpts) {
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
}

