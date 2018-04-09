// @flow

export type IAny = any

export type IPaymentSystemDefinition = {
  key: string;
  name: string;
  prefixPattern: RegExp;
  panPattern: RegExp;
  lengths: number[];
  codeName: string;
  codeLength: number;
  algorithm?: string;
}
export type IPaymentSystemDefinitions = IPaymentSystemDefinition[]

export type IBinDefinition = {
}

export type ICardInfo = {}
export type IPaymentSystem = string

export type IServiceKeys = 'getPaymentSystem' | 'getCardInfo'
export type IServiceOpts = {}
export interface IService {
  opts: IServiceOpts;
  constructor(IServiceOpts): IService;
  getPaymentSystem(pan: string): Promise<?IPaymentSystem>;
  getCardInfo(pan: string): Promise<?ICardInfo>;
  [key: IServiceKeys]: (pan: string) => Promise<?ICardInfo | ?IPaymentSystem>;
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
