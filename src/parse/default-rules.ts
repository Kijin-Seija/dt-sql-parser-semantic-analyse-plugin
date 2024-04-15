import { PostgreSqlParser } from 'dt-sql-parser/dist/lib/postgresql/PostgreSqlParser'

export const defaultAlias = {
  selectstmt: 'selectStatement',
  target_el: 'target_label'
}

export const defaultStmts = [
  'simple_select',
]

export const defaultEntities = [
  'target_el',
  'colid',
  'attr_name',
  'collabel'
]

export const defaultRules: Record<string, number[]> = {
  select_target: [
    PostgreSqlParser.RULE_simple_select,
    PostgreSqlParser.RULE_target_el,
  ],
  select_target_colid: [
    PostgreSqlParser.RULE_target_el,
    PostgreSqlParser.RULE_function_name,
    PostgreSqlParser.RULE_colid
  ],
  select_target_attr: [
    PostgreSqlParser.RULE_target_el,
    PostgreSqlParser.RULE_function_name,
    PostgreSqlParser.RULE_attr_name
  ],
  select_target_alias: [
    PostgreSqlParser.RULE_target_el,
    -PostgreSqlParser.RULE_attr_name,
    PostgreSqlParser.RULE_collabel
  ]
}
