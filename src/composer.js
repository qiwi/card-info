// @flow

import type {IService, IServiceKeys, ICardInfo, IPaymentSystem, IAny} from './interface'

export default function composer (...services: IService[]) {
  return {
    services,
    getPaymentSystem: getNextPromise.bind(null, services, 'getPaymentSystem'),
    getCardInfo: getNextPromise.bind(null, services, 'getCardInfo')
  }
}

function getNextService(services: IService[]): ?IService {
  return services.shift()
}

function getNextPromise(services, methodName: IServiceKeys, ...args: IAny): Promise<?ICardInfo | ?IPaymentSystem> {
  const service = getNextService(services)
  if (!service) {
    throw new Error('Composer: broken service in chain')
  }

  const method: (pan: string) => Promise<?ICardInfo | ?IPaymentSystem> = service[methodName]
  if (typeof method !== 'function') {
    throw new Error('Composer: broken service in chain')
  }

  return method(...args).then(res => {
    if (res === null && services.length) {
      return getNextPromise(services, methodName, args)
    }

    return res
  })
}
