// @flow

import type {
  IPaymentSystem,
  IService,
  IServiceKeys,
  IServiceOpts,
  ICardInfo
} from '../../interface'
import {AbstractService, AbstractRemoteService} from '../abstract'
import {clearEmptyFields} from '../../assets/util'

export const URL = 'https://lookup.binlist.net'
export const DEFAULT_OPTS: IServiceOpts = {
  url: URL,
  headers: {
    'Accept-Version': '3'
  },
  skipError: true
}

export type IBinlistResponse = {
  number: ?Object,
  scheme: string,
  brand: ?string,
  type: ?string,
  country: ?{
    numeric: string,
    alpha2: string,
    name: string,
    emoji: string,
    currency: string,
    latitude: number,
    longitude: number
  },
  bank: ?{
    name: string,
    url: string,
    phone: string
  }
}

export default class BinlistnetService extends AbstractRemoteService implements IService {
  opts: IServiceOpts
  $key: IServiceKeys
  $value: any

  static formatCardInfo (res: IBinlistResponse): ?ICardInfo {
    const {bank, country} = res

    if (!res.scheme) {
      return null
    }

    return clearEmptyFields({
      paymentSystem: AbstractService.normalizePaymentSystem(res.scheme),
      type: res.type,
      brand: res.brand,
      issuer: bank && country
        ? {
          country: country.alpha2,
          name: bank.name,
          url: bank.url,
          phone: bank.phone
        }
        : null
    })
  }

  static formatPaymentSystem (res: IBinlistResponse): ?IPaymentSystem {
    return AbstractService.normalizePaymentSystem(res.scheme)
  }

  static DEFAULT_OPTS: IServiceOpts = DEFAULT_OPTS
}
