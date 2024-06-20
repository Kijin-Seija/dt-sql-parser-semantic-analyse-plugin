import { SQLVisitor } from './visitor'
import { type SQLParseResult } from '../types'
import { type BasicSQL } from '../dt-sql-parser.types'

export function parse (
  sql: string,
  sqlType: BasicSQL | undefined,
  parser: Record<string, any> = {},
  stmts: string[] = [],
  entities: string[] = [],
  rules: Record<string, number[]> = {},
  alias: Record<string, string> = {},
): SQLParseResult {
  if (!sqlType) {
    console.error('请指定一个parser')
    return {
      stmtList: [],
      nerestCaretEntityList: []
    }
  }
  const tree = sqlType.parse(sql)
  console.log('tree', tree)
  const visitor = new SQLVisitor()
  visitor.setParser(parser)
  visitor.visitorAlias = alias
  stmts.forEach(stmt => { visitor.addStmt(stmt) })
  entities.forEach(entity => { visitor.addEntity(entity) })
  Object.keys(rules).forEach(name => { visitor.addRules(name, rules[name]) })
  visitor.visit(tree)
  return visitor.getResult()
}
