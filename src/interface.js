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

export type IServiceOpts = Object
export interface IService {
  constructor(IServiceOpts): IService;
  getPaymentSystem(pan: string): Promise<?IPaymentSystem>;
  getCardInfo(pan: string): Promise<?ICardInfo>;
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
