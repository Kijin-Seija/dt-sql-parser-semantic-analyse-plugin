import { PostgreSQLParser } from 'dt-sql-parser/dist/lib/pgsql/PostgreSQLParser'

export const defaultStmts = [
  'stmt',
  // select statement
  'selectstmt'
]

export const defaultEntities = [
  // column_name directly. ex: select column1
  'column_name',
  // column_name indirectly. ex: select schema.column1
  'columnref',
  'table_name',
  'view_name',
  'function_name',
  'schema_name',
  'colid',
  'attr_name',
  'collabel',
  'func_arg_expr'
]

export const defaultRules: Record<string, number[]> = {
  // 通用的简单column规则（不带.运算符的column)
  common_column_simple: [
    PostgreSQLParser.RULE_stmt,
    PostgreSQLParser.RULE_column_name
  ],
  // 通用的复合column规则（带.运算符的column)
  common_column_ref: [
    PostgreSQLParser.RULE_stmt,
    PostgreSQLParser.RULE_columnref
  ],
  select_target_column_simple: [
    PostgreSQLParser.RULE_selectstmt,
    PostgreSQLParser.RULE_select_clause,
    PostgreSQLParser.RULE_target_list,
    PostgreSQLParser.RULE_column_name
  ],
  select_target_column_ref: [
    PostgreSQLParser.RULE_selectstmt,
    PostgreSQLParser.RULE_select_clause,
    PostgreSQLParser.RULE_target_list,
    PostgreSQLParser.RULE_columnref
  ],
  select_target_function: [
    PostgreSQLParser.RULE_selectstmt,
    PostgreSQLParser.RULE_select_clause,
    PostgreSQLParser.RULE_target_list,
    PostgreSQLParser.RULE_function_name
  ],
  select_column_alias: [
    PostgreSQLParser.RULE_selectstmt,
    PostgreSQLParser.RULE_select_clause,
    PostgreSQLParser.RULE_target_list,
    PostgreSQLParser.RULE_collabel
  ],
  select_from_table: [
    PostgreSQLParser.RULE_selectstmt,
    PostgreSQLParser.RULE_select_clause,
    PostgreSQLParser.RULE_from_clause,
    PostgreSQLParser.RULE_table_name
  ],
  select_from_view: [
    PostgreSQLParser.RULE_selectstmt,
    PostgreSQLParser.RULE_select_clause,
    PostgreSQLParser.RULE_from_clause,
    PostgreSQLParser.RULE_view_name
  ],
  select_from_function: [
    PostgreSQLParser.RULE_selectstmt,
    PostgreSQLParser.RULE_select_clause,
    PostgreSQLParser.RULE_from_clause,
    PostgreSQLParser.RULE_function_name
  ],
  column_ref_colid: [
    PostgreSQLParser.RULE_columnref,
    PostgreSQLParser.RULE_colid
  ],
  column_ref_attr: [
    PostgreSQLParser.RULE_columnref,
    PostgreSQLParser.RULE_attr_name
  ],
  function_arg_expr: [
    PostgreSQLParser.RULE_function_name,
    PostgreSQLParser.RULE_func_arg_expr
  ]
}
