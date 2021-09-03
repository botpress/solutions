function hook(bp: typeof sdk, botId: string) {
  /** Your code starts below */

  bp.http.deleteRouterForBot("custom-analytics");

  /** Your code ends here */
}
