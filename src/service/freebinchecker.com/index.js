// @flow

import type {
  IPaymentSystem,
  IService,
  IServiceKeys,
  IServiceOpts,
  ICardInfo
} from '../../interface'
import AbstractService from '../abstract'
import {clearEmptyFields} from '../../assets/util'

export const URL = 'https://api.freebinchecker.com/bin/'
export const DEFAULT_OPTS: IServiceOpts = {
  url: URL,
  skipError: true
}

export type IFreebincheckerResponse = {
  valid: ?boolean,
  card: {
    brand: string,
    type: string,
    category: string,
    'sub-category': ?string
  },

  country: ?{
    'alpha-2-code': string,
    'numeric-code': string,
    name: string,
    latitude: string,
    longitude: string
  },
  issuer: ?{
    name: string,
    url: string,
    tel: string
  }
}

export default class FreebincheckerService extends AbstractService implements IService {
  opts: IServiceOpts
  $key: IServiceKeys
  $value: any

  getPaymentSystem(pan: string): Promise<?IPaymentSystem> {
    return AbstractService.performRequest(pan, this.opts, this.constructor.formatPaymentSystem.bind(this.constructor))
  }

  getCardInfo(pan: string): Promise<?ICardInfo> {
    return AbstractService.performRequest(pan, this.opts, this.constructor.formatCardInfo.bind(this.constructor))
  }

  static formatCardInfo (res: IFreebincheckerResponse): ?ICardInfo {
    const {card, issuer, country} = res

    if (!res.valid) {
      return null
    }

    return clearEmptyFields({
      paymentSystem: this.formatPaymentSystem(res),
      type: card.type,
      brand: card['sub-category'],
      issuer: issuer && country
        ? {
          country: country['alpha-2-code'],
          name: issuer.name,
          url: issuer.url,
          phone: issuer.tel
        }
        : null

    })
  }

  static formatPaymentSystem (res: IFreebincheckerResponse): ?IPaymentSystem {
    if (!res.valid) {
      return null
    }

    return AbstractService.normalizePaymentSystem(res.card.brand)
  }

  static DEFAULT_OPTS: IServiceOpts = DEFAULT_OPTS
}
