export interface Config {
  /**
   * @default false
   */
  enabled: boolean
  /**
   * Configurations specific to messenger channel
   */
  messenger: {
    /**
     * When messenger module is enabled, host must be added to whitelist to use the webview.
     * Enable this when the messenger channel is enabled
     * @default false
     */
    addToWhitelist: boolean
    /**
     * Provide custom URL instead of the server's external url (for whitelist & return url)
     * @default ""
     */
    customUrl: string
  }
}
