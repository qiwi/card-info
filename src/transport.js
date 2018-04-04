// @flow

import type {IHttpOpts, IHttpTransport} from './interface'

const transport: IHttpTransport = {
  get (opts: IHttpOpts) {
    return fetch(opts)
  }
}

export default transport
