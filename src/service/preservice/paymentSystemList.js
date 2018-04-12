// @flow

/**
 * Patterns below are mostly copy-pasted from Braintree preservice impl
 * https://github.com/braintree/credit-card-type
 */

/**
 * Short names ares consistent with the `paymentwall convention`
 * https://docs.paymentwall.com/reference/payment-system-shortcodes
 */

import type {IPaymentSystemDefinitions} from '../../interface'
import {LUHN} from '../../validator'

export const CVV = 'CVV'  // Card verification value
export const CVP = 'CVP'  // Card verification parameter
export const CVC = 'CVC'  // Card verification code
export const CVN = 'CVN'  // Card verification number
export const CID = 'CID'  // Card identification

export const VISA = 'VISA'
export const MASTERCARD = 'MASTERCARD'
export const AMERICAN_EXPRESS = 'AMERICAN-EXPRESS'
export const DINERS_CLUB = 'DINERS-CLUB'
export const DISCOVER = 'DISCOVER'
export const JCB = 'JCB'
export const UNIONPAY = 'UNIONPAY'
export const MAESTRO = 'MAESTRO'
export const MIR = 'MIR'

const list: IPaymentSystemDefinitions = [
  {
    key: VISA,
    name: {
      short: 'visa',
      nice: 'Visa',
      org: 'Visa Inc.'
    },
    pan: {
      prefixPattern: /^4/,
      pattern: /^4\d{15,18}$/,
      lengths: [16],
      algorithm: LUHN
    },
    code: {
      name: CVV,
      length: 3
    }
  },
  {
    key: MASTERCARD,
    name: {
      short: 'mastercard',
      nice: 'Mastercard',
      aliases: ['mc', 'mcms', 'master-card'],
      org: 'Mastercard Inc.'
    },
    pan: {
      prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27|27[0-2]|2720)$/,
      pattern: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)\d*$/,
      lengths: [16],
      algorithm: LUHN,
    },
    code: {
      name: CVC,
      length: 3,
    },
  },
  {
    key: AMERICAN_EXPRESS,
    name: {
      short: 'amex',
      nice: 'American Express',
      org: 'American Express Company'
    },
    pan: {
      prefixPattern: /^(3|34|37)$/,
      pattern: /^3[47]\d*$/,
      lengths: [15],
      algorithm: LUHN
    },
    code: {
      name: CID,
      length: 4,
    }
  },
  {
    key: DINERS_CLUB,
    name: {
      short: 'dinersclub',
      nice: 'Diners Club',
    },
    pan: {
      prefixPattern: /^(3|3[0689]|30[0-5])$/,
      pattern: /^3(0[0-5]|[689])\d*$/,
      lengths: [14, 16, 19],
      algorithm: LUHN
    },
    code: {
      name: CVV,
      length: 3,
    }
  },
  {
    key: DISCOVER,
    name: {
      short: 'discover',
      nice: 'Discover',
    },
    pan: {
      prefixPattern: /^(6|60|601|6011|65|64|64[4-9])$/,
      pattern: /^(6011|65|64[4-9])\d*$/,
      lengths: [16, 19],
      algorithm: LUHN
    },
    code: {
      name: CID,
      length: 3,
    }
  },
  {
    key: JCB,
    name: {
      short: 'jcb',
      nice: 'JCB',
      aliases: ['Japan Credit Bureau']
    },
    pan: {
      prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
      pattern: /^(2131|1800|35)\d*$/,
      lengths: [16, 17, 18, 19],
      algorithm: LUHN
    },
    code: {
      name: CVV,
      length: 3,
    }
  },
  {
    key: UNIONPAY,
    name: {
      short: 'unionpay',
      nice: 'UnionPay',
    },
    pan: {
      prefixPattern: /^((6|62|62\d|(621(?!83|88|98|99))|622(?!06)|627[02,06,07]|628(?!0|1)|629[1,2])|622018)$/,
      pattern: /^((620|(621(?!83|88|98|99))|622(?!06|018)|62[3-6]|627[02,06,07]|628(?!0|1)|629[1,2])\d*|622018\d{12})$/,
      lengths: [16, 17, 18, 19],
      algorithm: LUHN
    },
    code: {
      name: CVN,
      length: 3,
    }
  },
  {
    key: MAESTRO,
    name: {
      short: 'maestro',
      nice: 'Maestro',
    },
    pan: {
      prefixPattern: /^(5|5[06-9]|6\d*)$/,
      pattern: /^(5[06-9]|6[37])\d*$/,
      gaps: [4, 8, 12],
      lengths: [12, 13, 14, 15, 16, 17, 18, 19],
      algorithm: LUHN
    },
    code: {
      name: CVC,
      length: 3,
    }
  },
  {
    key: MIR,
    name: {
      short: 'mir',
      nice: 'Mir',
    },
    pan: {
      prefixPattern: /^(2|22|220|220[0-4])$/,
      pattern: /^(220[0-4])\d*$/,
      lengths: [16, 17, 18, 19],
    },
    code: {
      name: CVP,
      length: 3,
    }
  }
]

export default list
