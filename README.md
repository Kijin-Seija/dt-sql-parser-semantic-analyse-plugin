# dt-sql-parser-semantic-analyse-plugin

A [dt-sql-parser](https://github.com/DTStack/dt-sql-parser) plugin with semantic result. [Theory(zh-CN)](https://github.com/Kijin-Seija/dt-sql-parser-analyse-demo).

## Installation

```
npm install dt-sql-parser-semantic-analyse-plugin
```

## Quick Usage

```typescript
const myPlugin = new DtSqlParserSemAnalysePlugin()
const sql = 'SELECT a| FROM t'
const caretColumn = sql.indexOf('|') + 1
const result = myPlugin.parse(sql.replace('|', ''), { lineNumber: 1, columnNumber: caretColumn })
console.log(result)
```

This will use a postgresql Parser and build-in rules/preprocessors

## Add a Rule Chain

```typescript
import { PostgresSQL } from 'dt-sql-parser'
import { PostgreSQLParser } from 'dt-sql-parser/dist/lib/pgsql/PostgreSQLParser'

const myPlugin = new DtSqlParserSemAnalysePlugin({
  parse: {
    parser: new PostgresSQL()
    alias: {
      selectstmt: 'selectStatement',
      target_el: 'target_label'
    }
    stmts: [
      'selectstmt'
    ],
    entities: [
      'column_name'
    ],
    rules: {
      'select_columns': [
        PostgreSQLParser.RULE_insertstmt,
        PostgreSQLParser.RULE_column_name
      ]      
    }
  }
})
const sql = 'SELECT a| FROM t'
const caretColumn = sql.indexOf('|') + 1
const result = myPlugin.parse(sql.replace('|', ''), { lineNumber: 1, columnNumber: caretColumn })
console.log(result)
```

**Notice: A rule must start with a/an statement/entity and stop with an entity. You should add a node keywords(keyword is in your parser with format: `RULE_[keyword]`) into stmts/entities before using it.**

## Rule Chain Opeator

You can set a negative number whose abs equals to a ruleIndex. That means exclude this rule.

Example:

```typescript
select_target_alias: [
  PostgreSqlParser.RULE_target_el,
  -PostgreSqlParser.RULE_attr_name,
  PostgreSqlParser.RULE_collabel
]
```

🚧 I will later work on `Operator.AND` and `Operator.OR`.

## Alias

Some node names in dt-sql-parser code are different from their antlr4's definition.

You can find possible alias in https://github.com/DTStack/dt-sql-parser/blob/main/src/grammar/postgresql/PostgreSqlParser.g4, then add it into `alias` option.

Example:

![alt text](./assets/alias-example.png)


## Add a preprocessor

```typescript
const myPlugin = new DtSqlParserSemAnalysePlugin({
  preprocessor: [
    (sql) => sql.toUpperCase(),
    ...
  ]
})
```


