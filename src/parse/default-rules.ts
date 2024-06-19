import { PostgreSqlParser } from 'dt-sql-parser/dist/lib/postgresql/PostgreSqlParser'

export const defaultAlias = {
  selectstmt: 'selectStatement',
  insertstmt: 'insertStatement',
  target_el: 'target_label',
  table_name: 'tableName',
  view_name: 'viewName',
  column_name: 'columnName',
  schema_name: 'schemaName'
}

export const defaultStmts = [
  'selectstmt',
  'insertstmt',
  'updatestmt',
  'deletestmt',
  'altertablestmt',
  'alterfunctionstmt',
  'dropstmt',
  'createfunctionstmt'
]

export const defaultEntities = [
  'target_el',
  'colid',
  'attr_name',
  'collabel',
  'table_name',
  'view_name',
  'function_with_argtypes',
  'column_name',
  'schema_name',
  'anysconst'
]

export const defaultRules: Record<string, number[]> = {
  select_target: [
    PostgreSqlParser.RULE_selectstmt,
    PostgreSqlParser.RULE_target_el,
  ],
  select_from_table: [
    PostgreSqlParser.RULE_selectstmt,
    PostgreSqlParser.RULE_from_clause,
    PostgreSqlParser.RULE_table_name
  ],
  insert_target_table: [
    PostgreSqlParser.RULE_insertstmt,
    PostgreSqlParser.RULE_insert_target,
    PostgreSqlParser.RULE_table_name
  ],
  update_relation_table: [
    PostgreSqlParser.RULE_updatestmt,
    PostgreSqlParser.RULE_relation_expr,
    PostgreSqlParser.RULE_table_name
  ],
  delete_relation_table: [
    PostgreSqlParser.RULE_deletestmt,
    PostgreSqlParser.RULE_relation_expr,
    PostgreSqlParser.RULE_table_name
  ],
  alter_table: [
    PostgreSqlParser.RULE_altertablestmt,
    PostgreSqlParser.RULE_relation_expr,
    PostgreSqlParser.RULE_table_name
  ],
  alter_view: [
    PostgreSqlParser.RULE_altertablestmt,
    PostgreSqlParser.RULE_view_name
  ],
  alter_function: [
    PostgreSqlParser.RULE_alterfunctionstmt,
    PostgreSqlParser.RULE_alterFunctionTypeClause,
    PostgreSqlParser.RULE_function_with_argtypes
  ],
  alter_table_drop_column: [
    PostgreSqlParser.RULE_altertablestmt,
    PostgreSqlParser.RULE_alter_table_cmds,
    PostgreSqlParser.RULE_column_name
  ],
  drop_table: [
    PostgreSqlParser.RULE_dropstmt,
    PostgreSqlParser.RULE_table_name_list,
    PostgreSqlParser.RULE_table_name
  ],
  drop_view: [
    PostgreSqlParser.RULE_dropstmt,
    PostgreSqlParser.RULE_view_nameList,
    PostgreSqlParser.RULE_view_name
  ],
  drop_schema: [
    PostgreSqlParser.RULE_dropstmt,
    PostgreSqlParser.RULE_schema_name_list,
    PostgreSqlParser.RULE_schema_name
  ],
  create_function_sub_content: [
    PostgreSqlParser.RULE_createfunctionstmt,
    PostgreSqlParser.RULE_createfunc_opt_list,
    PostgreSqlParser.RULE_colid,
    PostgreSqlParser.RULE_anysconst,
  ],
  // sub entities
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
  table_name_colid: [
    PostgreSqlParser.RULE_table_name,
    PostgreSqlParser.RULE_colid
  ],
  table_name_attr: [
    PostgreSqlParser.RULE_table_name,
    PostgreSqlParser.RULE_attr_name,
  ],
  view_name_colid: [
    PostgreSqlParser.RULE_view_name,
    PostgreSqlParser.RULE_colid
  ],
  view_name_attr: [
    PostgreSqlParser.RULE_view_name,
    PostgreSqlParser.RULE_attr_name,
  ],
  function_colid: [
    PostgreSqlParser.RULE_function_with_argtypes,
    PostgreSqlParser.RULE_colid
  ],
  function_attr: [
    PostgreSqlParser.RULE_function_with_argtypes,
    PostgreSqlParser.RULE_attr_name,
  ],
  column_name_colid: [
    PostgreSqlParser.RULE_column_name,
    PostgreSqlParser.RULE_colid
  ],
  column_name_attr: [
    PostgreSqlParser.RULE_column_name,
    PostgreSqlParser.RULE_attr_name,
  ]
}
