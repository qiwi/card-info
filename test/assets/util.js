import {clearEmptyFields} from '../../src/assets/util'

describe('util', () => {
  describe('clearEmptyFields', () => {
    it('filters out null and undefined props', () => {
      const foo = {
        bar: 123,
        baz: 0,
        qux: null,
        quux: undefined
      }

      expect(Object.keys(clearEmptyFields(foo))).toEqual(['bar', 'baz'])
    })

    it('processes inner objects', () => {
      const foo = {
        bar: {
          baz: {
            dgx: null,
            dfs: 'dfs'
          }
        }
      }

      clearEmptyFields(foo)

      expect(Object.keys(foo.bar.baz)).toEqual(['dfs'])
    })
  })
})
