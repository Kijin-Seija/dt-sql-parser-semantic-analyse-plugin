import { PostgreSQL } from 'dt-sql-parser'
import { SQLVisitor } from './visitor'
import { type SQLParseResult } from '../types'
import { type BasicSQL } from 'dt-sql-parser/dist/parser/common/basicSQL'

export function parse (
  sql: string,
  parser: BasicSQL = new PostgreSQL(),
  stmts: string[] = [],
  entities: string[] = [],
  rules: Record<string, number[]> = {},
  alias: Record<string, string> = {},
): SQLParseResult {
  const tree = parser.parse(sql)
  console.log('tree', tree)
  const visitor = new SQLVisitor()
  visitor.visitorAlias = alias
  stmts.forEach(stmt => { visitor.addStmt(stmt) })
  entities.forEach(entity => { visitor.addEntity(entity) })
  Object.keys(rules).forEach(name => { visitor.addRules(name, rules[name]) })
  visitor.visit(tree)
  return visitor.getResult()
}
