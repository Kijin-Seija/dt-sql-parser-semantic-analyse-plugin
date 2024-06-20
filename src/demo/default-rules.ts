import { PostgreSqlParser } from 'dt-sql-parser/dist/lib/postgresql/PostgreSqlParser'

export const defaultAlias = {
  selectstmt: 'selectStatement',
  target_el: 'target_label',
  table_name: 'tableName'
}

export const defaultStmts = [
  'selectstmt',
]

export const defaultEntities = [
  'target_el',
  'colid',
  'attr_name',
  'collabel',
  'table_name'
]

export const defaultRules: Record<string, number[]> = {
  select_target: [
    PostgreSqlParser.RULE_selectstmt,
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
  ],
  select_from_table: [
    PostgreSqlParser.RULE_selectstmt,
    PostgreSqlParser.RULE_from_clause,
    PostgreSqlParser.RULE_table_name
  ],
  table_name_colid: [
    PostgreSqlParser.RULE_table_name,
    PostgreSqlParser.RULE_colid
  ],
  table_name_attr: [
    PostgreSqlParser.RULE_table_name,
    PostgreSqlParser.RULE_attr_name,
  ]
}
