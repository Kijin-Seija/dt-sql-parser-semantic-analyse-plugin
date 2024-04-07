import { type Preprocessor } from '../types'

export function preprocess (
  sql: string,
  preprocessorList: Preprocessor[] = []
) {
  return preprocessorList.reduce((preSql, preprocessor) => preprocessor(preSql), sql)
}
