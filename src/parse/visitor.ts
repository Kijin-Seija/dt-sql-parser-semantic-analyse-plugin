import { AbstractParseTreeVisitor, type RuleContext } from 'antlr4ng'
import { type PostgreSqlParserVisitor } from 'dt-sql-parser'
import { type ProgramContext, PostgreSqlParser } from 'dt-sql-parser/dist/lib/postgresql/PostgreSqlParser'
import { type Entity, type SQLParseResult, type Stmt } from '../types'
import { caretPlaceholder } from '../caret'

function toVisitorAlias (node: string, alias: Record<string, string>) {
  const result = alias[node] || node
  return `visit${result.slice(0, 1).toUpperCase()}${result.slice(1)}`
}

function withCaret (ctx: RuleContext) {
  return ctx.getText().includes(caretPlaceholder)
}

export class SQLVisitor extends AbstractParseTreeVisitor<void> implements PostgreSqlParserVisitor<void> {
  private result: SQLParseResult = {
    stmtList: [],
    nerestCaretEntityList: []
  }

  public clear () {
    this.result = { stmtList: [], nerestCaretEntityList: [] }
  }

  public getResult () {
    return this.result
  }

  public visitorAlias = {}

  private readonly stmtStack: Stmt[] = []

  private readonly entityStack: Entity[] = []

  private readonly rules = new Map<string, number[]>()

  private readonly stmtRules = new Map<number, string[]>()

  private readonly entityRules = new Map<number, string[]>()

  public addRules (name: string, rules: number[]) {
    if (!this.stmtRules.has(rules[0]) && !this.entityRules.has(rules[0])) {
      console.error(`待添加的规则${name}的起始节点未被注册为Statement/Entity，请先注册，或者调整规则起始节点为已注册的Statement/Entity`)
      return
    }
    if (!this.entityRules.has(rules[rules.length - 1])) {
      console.error(`待添加的规则${name}的结束节点未被注册为Entity，请先注册，或者调整规则结束节点为已注册的Entity`)
      return
    }
    this.rules.set(name, [...rules])
    if (this.stmtRules.has(rules[0])) this.stmtRules.get(rules[0])?.push(name)
    else if (this.entityRules.has(rules[0])) this.entityRules.get(rules[0])?.push(name)
    this.entityRules.get(rules[rules.length - 1])?.push(name)
  }

  public addEntity (name: string) {
    this.entityRules.set((PostgreSqlParser as any)[`RULE_${name}`], [])
    let isHitRule = false
    const visitorName = toVisitorAlias(name, this.visitorAlias)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const rules = this.entityRules.get((PostgreSqlParser as any)[`RULE_${name}`])!;
    (this as any)[visitorName] = (ctx: RuleContext) => {
      const chain = this.getNodeChain(ctx)
      for (const rule of rules) {
        const ruleChain = this.rules.get(rule)
        if (!ruleChain) continue
        if (this.matchRules(chain, ruleChain)) {
          const ruleChainBegin = ruleChain[0]
          const beginStmt = this.stmtStack.find(stmt => stmt.type === ruleChainBegin)
          const beginEntity = this.entityStack.find(entity => entity.type === ruleChainBegin)
          const result: Entity = {
            rule,
            text: ctx.getText(),
            type: ctx.ruleIndex,
            caret: withCaret(ctx),
            belongsToStmt: beginStmt || null,
            belongsToEntity: beginEntity || null,
            relatedEntities: {}
          }
          if (beginEntity) {
            if (!beginEntity.relatedEntities[rule]) beginEntity.relatedEntities[rule] = []
            beginEntity.relatedEntities[rule].push(result)
          } else if (beginStmt) {
            if (!beginStmt.relatedEntities[rule]) beginStmt.relatedEntities[rule] = []
            beginStmt.relatedEntities[rule].push(result)
          }
          if (beginStmt && withCaret(ctx)) this.result.nerestCaretEntityList.push(result)
          this.entityStack.push(result)
          isHitRule = true
        }
      }
      this.visitChildren(ctx)
      if (isHitRule) this.entityStack.pop()
    }
  }

  public addStmt (name: string) {
    this.stmtRules.set((PostgreSqlParser as any)[`RULE_${name}`], [])
    const visitorName = toVisitorAlias(name, this.visitorAlias);
    (this as any)[visitorName] = (ctx: RuleContext) => {
      this.stmtStack.push({
        text: ctx.getText(),
        type: ctx.ruleIndex,
        caret: withCaret(ctx),
        relatedEntities: {}
      })
      this.visitChildren(ctx)
      const lastStmt = this.stmtStack.pop()
      if (lastStmt) this.result.stmtList.push(lastStmt)
    }
  }

  private getNodeChain (ctx: RuleContext) {
    let _ctx: RuleContext | null = ctx
    const result = []
    while (_ctx) {
      result.unshift(_ctx.ruleIndex)
      _ctx = _ctx.parent
    }
    return result
  }

  private matchRules (chain: number[], ruleChain: number[] | undefined) {
    // 只要ruleChain里面每个元素都出现在chain里面，且顺序一致，则返回true。否则返回false
    // 当元素value为负数时，表示NOT，即不出现id为-value的规则。
    if (!ruleChain) return false
    let index = 0
    for (let i = 0; i < ruleChain.length; i++) {
      if (ruleChain[i] < 0) {
        if (chain.indexOf(-ruleChain[i]) >= index) return false
      } else if (chain.indexOf(ruleChain[i]) < index) return false
      else index = chain.indexOf(ruleChain[i])
    }
    return true
  }

  visitProgram (ctx: ProgramContext) {
    this.visitChildren(ctx)
  }
}
