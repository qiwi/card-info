// @flow

import type {IPaymentSystemDefinitions} from '../../interface'
import {LUHN} from '../../validator'
import {CVV} from './const'

const list: IPaymentSystemDefinitions = [{
  key: 'VISA',
  name: 'Visa',
  prefixPattern: /^4/,
  panPattern: /^4\d{15,18}$/,
  lengths: [16],
  codeName: CVV,
  codeLength: 3,
  algorithm: LUHN,
}]

export default list
