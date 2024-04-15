import { type Preprocessor } from '../types'

export const addSuffixForParseSelectProcessor: Preprocessor = (sql: string) => {
  const suffix = ' '
  const maxWords = 3
  if (/select( )+/.test(sql.toLowerCase()) && sql.split(' ').filter(item => item).length < maxWords) {
    return sql + '' + suffix
  }
  return sql
}

export const addSuffixForParseAlterFunctionProcessor: Preprocessor = (sql: string) => {
  const suffix = 'RESET ALL'
  const maxWords = 4
  if (/alter( )+function/.test(sql.toLowerCase()) && sql.split(' ').filter(item => item).length < maxWords) {
    return sql + '' + suffix
  }
  return sql
}

export const addSuffixForParseAlterTableProcessor: Preprocessor = (sql: string) => {
  const suffix = 'SET WITHOUT OIDS'
  const maxWords = 4
  if (/alter( )+table/.test(sql.toLowerCase()) && sql.split(' ').filter(item => item).length < maxWords) {
    return sql + '' + suffix
  }
  return sql
}

export const defaultPreprocessorList = [
  addSuffixForParseAlterFunctionProcessor,
  addSuffixForParseAlterTableProcessor,
  addSuffixForParseSelectProcessor
]
