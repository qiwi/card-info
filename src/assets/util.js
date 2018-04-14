// @flow

import type {IAny} from '../interface'

type ICleared = {
  [key: string]: $NonMaybeType<*>
}

type IIndexable = {
  [key: string]: IAny
}

export const clearEmptyFields = (obj: IIndexable): ICleared => {
  Object.keys(obj).forEach((key: string) => {
    const value: ?IIndexable = obj[key]

    if (value && typeof value === 'object') {
      clearEmptyFields(value)
    } else if (value == null) {
      delete obj[key]
    }
  })

  return obj
}
