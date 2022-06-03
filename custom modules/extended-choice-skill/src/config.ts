export interface Config {
  /**
   * @default extended-choice-skill
   */
  defaultContentElement: string
  /**
   * @default #QuickReplies
   */
  defaultContentRenderer: string
  /**
   * @default 3
   */
  defaultMaxAttempts: number
  /**
   * @default true
   */
  disableIntegrityCheck: boolean
  /**
   * @default true
   */
  matchNumbers: boolean
  /**
   * @default true
   */
  matchNLU: boolean
}
