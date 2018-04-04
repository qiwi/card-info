// @flow

export type IAny = any

export type IPaymentSystemDefinition = {
  key: string;
  name: string;
  prefixPattern: RegExp;
  typePattern: RegExp;
  lengths: []
}

export type IBinDefinition = {
}

export type ICardInfo = {}
export type IPaymentSystem = string

export type IServiceOpts = Object
export interface IService {
  constructor(IServiceOpts): IService;
  getPaymentSystem(pan: string): ?IPaymentSystem;
  getCardInfo(pan: string): ?ICardInfo;
}

export type IHttpOpts = URL | Request | string
export interface IHttpTransport {
  get(opts: IHttpOpts): Promise<IAny>;
}

export type IApiOpts = {
  type?: string;
  transport?: IHttpTransport;
}
export interface IApi extends IService {
  constructor(opts: IApiOpts): IApi;
  service: IService;
}
