// @flow

import type {IAny, IService, IServiceKeys, IServiceOpts} from '../../interface'
import AbstractService from '../abstract'
import assets from '../../assets'

const {transport} = assets

export const URL = 'https://lookup.binlist.net'
export const DEFAULT_OPTS = {
  url: URL
}

class BinlistService extends AbstractService implements IService {
  opts: IServiceOpts
  $key: IServiceKeys
  $value: any

  static DEFAULT_OPTS: Object = DEFAULT_OPTS
}
