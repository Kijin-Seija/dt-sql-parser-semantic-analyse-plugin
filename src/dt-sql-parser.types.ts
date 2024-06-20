export declare abstract class BasicSQL {
  /**
   * Parse input string and return parseTree.
   * @param input string
   * @param errorListener listen parse errors and lexer errors.
   * @returns parseTree
   */
  parse(input: string, errorListener?: any): any
}
