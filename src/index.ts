import { parse } from './parse'
import { preprocess } from './preprocess'
import { type PluginSettings, type InsertCaretPlaceholderConfig } from './types'
import { insertCaret } from './caret'

export class DtSqlParserSemAnalysePlugin {
  private readonly settings: PluginSettings = { parse: {} }

  constructor (settings?: PluginSettings) {
    this.settings = settings || { parse: {} }
  }

  public parse (sql: string, caret?: InsertCaretPlaceholderConfig) {
    const sqlAfterInsertCaret = insertCaret(sql, caret)
    const sqlAfterPreprocess = preprocess(sqlAfterInsertCaret, this.settings.preprocessor)
    const sqlParseResult = parse(
      sqlAfterPreprocess,
      this.settings.parse.sql,
      this.settings.parse.parser,
      this.settings.parse?.stmts,
      this.settings.parse?.entities,
      this.settings.parse?.rules,
      this.settings.parse?.alias
    )
    return sqlParseResult
  }
}

export * from './types'
export * from './caret'
