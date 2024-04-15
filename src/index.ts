import { defaultAlias, defaultEntities, defaultRules, defaultStmts } from './parse/default-rules'
import { parse } from './parse'
import { preprocess } from './preprocess'
import { type PluginSettings, type InsertCaretPlaceholderConfig } from './types'
import { defaultPreprocessorList } from './preprocess/default-preprocessor'
import { insertCaret } from './caret'
import { PostgreSQL } from 'dt-sql-parser'

export class DtSqlParserSemAnalysePlugin {
  private readonly settings: PluginSettings = {}

  constructor (settings?: PluginSettings) {
    this.settings = settings || {}
  }

  public parse (sql: string, caret?: InsertCaretPlaceholderConfig) {
    const sqlAfterInsertCaret = insertCaret(sql, caret)
    const sqlAfterPreprocess = preprocess(sqlAfterInsertCaret, this.settings.preprocessor || defaultPreprocessorList)
    const sqlParseResult = parse(
      sqlAfterPreprocess,
      this.settings.parse?.parser || new PostgreSQL(),
      this.settings.parse?.stmts || defaultStmts,
      this.settings.parse?.entities || defaultEntities,
      this.settings.parse?.rules || defaultRules,
      this.settings.parse?.alias || defaultAlias
    )
    return sqlParseResult
  }
}

export * from './types'
export * from './caret'
export * from './parse/default-rules'
export * from './preprocess/default-preprocessor'
