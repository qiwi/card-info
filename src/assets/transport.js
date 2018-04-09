// @flow

import type {IHttpOpts, IHttpTransport} from '../interface'

const transport: IHttpTransport = (opts: IHttpOpts) => {
  return fetch(opts.url, opts)
}

export default transport
