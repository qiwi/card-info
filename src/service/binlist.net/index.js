// @flow

import type {
  IAny,
  IPaymentSystem,
  IService,
  IServiceKeys,
  IServiceOpts,
  IResponse,
  ICardInfo
} from '../../interface'
import AbstractService from '../abstract'
import assets from '../../assets'

const {transport} = assets

export const URL = 'https://lookup.binlist.net'
export const DEFAULT_OPTS: IServiceOpts = {
  url: URL,
  headers: {
    'Accept-Version': '3'
  },
  skipError: true
}

export type IBinlistResponse = {
  number: Object,
  scheme: string,
  country: {
    numeric: string,
    alpha2: string,
    name: string,
    emoji: string,
    currency: string,
    latitude: number,
    longitude: number
  },
  bank: {
    name: string,
    url: string,
    phone: string
  }
}

export default class BinlistnetService extends AbstractService implements IService {
  opts: IServiceOpts
  $key: IServiceKeys
  $value: any

  getPaymentSystem(pan: string): Promise<?IPaymentSystem> {
    return this.constructor.performRequest(pan, this.opts, this.constructor.formatPaymentSystem)
  }

  getCardInfo(pan: string): Promise<?ICardInfo> {
    return this.constructor.performRequest(pan, this.opts, this.constructor.formatCardInfo)
  }

  static formatCardInfo (res: IBinlistResponse): ICardInfo {
    return Object.assign({}, res)
  }

  static formatPaymentSystem (res: IBinlistResponse): ?IPaymentSystem {
    return AbstractService.normalizePaymentSystem(res.scheme)
  }

  static performRequest(pan: string, opts: IServiceOpts, formatter: (res: IBinlistResponse) => ?ICardInfo | ?IPaymentSystem): Promise<IAny> {
    const url = `${opts.url || ''}/${pan}`
    const headers = opts.headers
    const skipError = opts.skipError

    return transport({
      url,
      headers
    })
      .then(this.parseResponse)
      .then(formatter)
      .catch((err: IAny) => {
        if (!skipError) {
          throw err
        }

        return null
      })
  }

  static parseResponse(res: IResponse): IAny {
    return res.json()
  }

  static DEFAULT_OPTS: IServiceOpts = DEFAULT_OPTS
}
