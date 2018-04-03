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
