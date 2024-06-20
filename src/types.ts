import { type BasicSQL } from './dt-sql-parser.types'

export interface InsertCaretPlaceholderConfig {
  lineNumber: number
  columnNumber: number
  text?: string
}

export type Preprocessor = (sql: string) => string

export interface PluginSettings {
  /**
   * custom preprocessor
   *
   * ---
   * 自定义预处理器
   */
  preprocessor?: Preprocessor[]

  /**
   * custom parse logic
   *
   * ---
   * 自定义解析逻辑
   */
  parse: {
    sql?: BasicSQL
    parser?: Record<string, any>
    stmts?: string[]
    entities?: string[]
    rules?: Record<string, number[]>
    alias?: Record<string, string>
  }
}

export interface SQLParseResultItem {
  stmt?: Stmt
  stmtType?: number
  entity?: Entity
  entityType?: number
  rule?: string
  caret: boolean
}

export interface Stmt {
  text: string
  type: number
  caret: boolean
  relatedEntities: Record<string, Entity[]>
}

export interface Entity {
  rule: string
  text: string
  type: number
  caret: boolean
  belongsToStmt: Stmt | null
  belongsToEntity: Entity | null
  relatedEntities: Record<string, Entity[]>
}

export interface SQLParseResult {
  stmtList: Stmt[]
  nerestCaretEntityList: Entity[]
}
