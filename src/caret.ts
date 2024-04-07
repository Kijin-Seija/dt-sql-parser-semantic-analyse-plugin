import { type InsertCaretPlaceholderConfig } from './types'

export const DEFAULT_CARET_PLACEHOLDER = '__CARET_PLACEHOLDER__'

export let caretPlaceholder = DEFAULT_CARET_PLACEHOLDER

export const insertCaret = (sql: string, config?: InsertCaretPlaceholderConfig) => {
  if (!config) return sql
  if (config.text) caretPlaceholder = config.text
  const sqlArr = sql.split('\n')
  sqlArr[config.lineNumber - 1] = sqlArr[config.lineNumber - 1].slice(0, config.columnNumber - 1) +
    caretPlaceholder +
    sqlArr[config.lineNumber - 1].slice(config.columnNumber - 1)
  return sqlArr.join('\n').trim()
}
