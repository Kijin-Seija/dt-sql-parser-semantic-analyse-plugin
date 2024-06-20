import { PostgreSQL } from 'dt-sql-parser-oushudb'
import { PostgreSqlParser } from 'dt-sql-parser-oushudb/dist/lib/postgresql/PostgreSqlParser'
import { DtSqlParserSemAnalysePlugin } from '..'

const myPlugin = new DtSqlParserSemAnalysePlugin({
  parse: {
    sql: new PostgreSQL(),
    parser: PostgreSqlParser,
    alias: {
      selectstmt: 'selectStatement',
    },
    stmts: [
      'selectstmt',
    ],
    entities: [
      'target_el',
    ],
    rules: {
      select_target: [
        PostgreSqlParser.RULE_selectstmt,
        PostgreSqlParser.RULE_target_el,
      ]
    }
  }
})

const sql = 'SELECT a| FROM t'
const caretColumn = sql.indexOf('|') + 1
const result = myPlugin.parse(sql.replace('|', ''), { lineNumber: 1, columnNumber: caretColumn })
console.log(result)
