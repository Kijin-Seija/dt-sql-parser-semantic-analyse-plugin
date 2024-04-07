import type BasicParser from 'dt-sql-parser/dist/parser/common/basicParser'

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
  parse?: {
    parser?: BasicParser
    stmts?: string[]
    entities?: string[]
    rules?: Record<string, number[]>
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
  belongsToStmt: Stmt
  relatedEntities: Record<string, Entity[]>
}

export interface SQLParseResult {
  stmtList: Stmt[]
  nerestCaretEntityList: Entity[]
}
