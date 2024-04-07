import { PostgresSQL } from 'dt-sql-parser'
import { SQLVisitor } from './visitor'
import { type SQLParseResult } from '../types'
import type BasicParser from 'dt-sql-parser/dist/parser/common/basicParser'

export function parse (
  sql: string,
  parser: BasicParser = new PostgresSQL(),
  stmts: string[] = [],
  entities: string[] = [],
  rules: Record<string, number[]> = {}
): SQLParseResult {
  const tree = parser.parse(sql)
  console.log('tree', tree)
  const visitor = new SQLVisitor()
  stmts.forEach(stmt => { visitor.addStmt(stmt) })
  entities.forEach(entity => { visitor.addEntity(entity) })
  Object.keys(rules).forEach(name => { visitor.addRules(name, rules[name]) })
  visitor.visit(tree)
  return visitor.getResult()
}
