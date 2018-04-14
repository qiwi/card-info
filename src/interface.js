// @flow

export type IAny = any

export type IPaymentSystemDefinition = {
  key: string;
  name: {
    short?: string;
    nice: string;
    aliases?: string[];
    org?: string;
  };
  pan: {
    pattern: RegExp;
    prefixPattern: RegExp;
    lengths: number[];
    algorithm?: string;
  };
  code: {
    name: string;
    length: number;
  }
}
export type IPaymentSystemDefinitions = IPaymentSystemDefinition[]

export type IBinDefinition = {
}

export type ICardInfo = {
  paymentSystem: string;
  valid?: boolean;
  type?: string;
  brand?: string;
  category?: string;
  issuer?: {
    name?: string;
    country?: string;
    address?: string;
    url?: string;
    phone?: string;
    svg?: string;
  }
}
export type IPaymentSystem = string

export type IServiceKeys = 'getPaymentSystem' | 'getCardInfo'
export type IServiceOpts = {
  url? :string;
  headers?: IAny;
  skipError?: boolean;
}
export interface IService {
  opts: IServiceOpts;
  constructor(IServiceOpts): IService;
  getPaymentSystem(pan: string): Promise<?IPaymentSystem>;
  getCardInfo(pan: string): Promise<?ICardInfo>;
  [key: IServiceKeys]: (pan: string) => Promise<?ICardInfo | ?IPaymentSystem>;
}

export interface IResponse {
  json(): IAny
}

export type IHttpOpts = {
  url: string;
} & RequestOptions;
export type IHttpTransport = {
  (opts: IHttpOpts): Promise<IAny>
}

export type IApiOpts = {
  type?: string;
  transport?: IHttpTransport;
}
export interface IApi extends IService {
  constructor(opts: IApiOpts): IApi;
  service: IService;
}
